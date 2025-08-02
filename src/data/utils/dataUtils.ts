import Papa from 'papaparse';

export enum GenderType {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  ALL = 'ALL',
  UNKNOWN = 'UNKNOWN',
}

export enum AgeGroupType {
  FETUS = 'FETUS',
  NEWBORN = 'NEWBORN',
  INFANT = 'INFANT',
  CHILD = 'CHILD',
  ADOLESCENT = 'ADOLESCENT',
  ADULT = 'ADULT',
  OLDER_ADULT = 'OLDER_ADULT',
  UNKNOWN = 'UNKNOWN',
}

export enum DataSource {
  CLINICALTRIALS_GOV = 'CLINICALTRIALS_GOV',
  EUDRACT = 'EUDRACT',
}

export enum StudyStatus {
  ACTIVE_NOT_RECRUITING = 'ACTIVE_NOT_RECRUITING',
  COMPLETED = 'COMPLETED',
  ENROLLING_BY_INVITATION = 'ENROLLING_BY_INVITATION',
  NOT_YET_RECRUITING = 'NOT_YET_RECRUITING',
  RECRUITING = 'RECRUITING',
  UNKNOWN = 'Unknown',
  WITHDRAWN = 'WITHDRAWN',
  WITHHELD = 'WITHHELD',
}

export interface TrialData {
  id: string;
  title: string;
  source: 'US' | 'EU';
  status: string;
  condition: string;
  sponsor: string;
  startDate: Date | null;
  completionDate: Date | null;
  gender: GenderType;
  ageGroup: AgeGroupType[];
  location: string;
  url: string;
  dataSource: DataSource;
}

export interface ProcessedData {
  trials: TrialData[];
  totalTrials: number;
  usTrials: number;
  euTrials: number;
  conditions: { [key: string]: number };
  sponsors: { [key: string]: number };
  statuses: { [key: string]: number };
}

export class DataUtils {
  private static async loadCSV(filePath: string): Promise<any[]> {
    try {
      // For local development, we'll use fetch with the file path
      const response = await fetch(filePath);
      const csvText = await response.text();

      // Use PapaParse to parse the CSV
      const result = Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
      });

      console.log(`Loaded ${result.data.length} rows from ${filePath}`);
      return result.data;
    } catch (error) {
      console.error(`Error loading CSV from ${filePath}:`, error);
      return [];
    }
  }

  /**
   * Normalizes gender values from both US and EU datasets
   * @param genderValue - Raw gender value from CSV (Sex or Gender field)
   * @returns Standardized gender type
   */
  static normalizeGender(genderValue: string): GenderType {
    if (!genderValue) return GenderType.ALL;

    const normalized = genderValue.toLowerCase().trim().split(', ');

    if (
      (normalized.includes('male') && normalized.includes('female')) ||
      normalized.includes('all')
    ) {
      return GenderType.ALL;
    }

    if (normalized.includes('male')) {
      return GenderType.MALE;
    }

    if (normalized.includes('female')) {
      return GenderType.FEMALE;
    }

    return GenderType.UNKNOWN;
  }

  /**
   * Normalizes age group values from both US and EU datasets
   * @param ageValue - Raw age value from CSV (Age or Population_Age field)
   * @returns Standardized age group type list
   */
  static normalizeAgeGroup(ageValue: string): AgeGroupType[] {
    if (!ageValue) return [AgeGroupType.UNKNOWN];

    const normalized = ageValue.toLowerCase().trim().split(', ');
    const ageGroupTypes: AgeGroupType[] = [];

    if (normalized.includes('in utero')) {
      ageGroupTypes.push(AgeGroupType.FETUS);
    }

    if (
      normalized.includes('preterm newborn infants') ||
      normalized.includes('newborns')
    ) {
      ageGroupTypes.push(AgeGroupType.NEWBORN);
    }

    if (normalized.includes('infants and toddlers')) {
      ageGroupTypes.push(AgeGroupType.INFANT);
    }

    if (normalized.includes('child') || normalized.includes('children')) {
      ageGroupTypes.push(AgeGroupType.CHILD);
    }

    if (normalized.includes('adolescent') || normalized.includes('under 18')) {
      ageGroupTypes.push(AgeGroupType.ADOLESCENT);
    }

    if (normalized.includes('adult') || normalized.includes('adults')) {
      ageGroupTypes.push(AgeGroupType.ADULT);
    }

    if (normalized.includes('older_adult') || normalized.includes('elderly')) {
      ageGroupTypes.push(AgeGroupType.OLDER_ADULT);
    }

    return ageGroupTypes;
  }

  /**
   * Normalizes study status from both US and EU datasets
   * @param ageValue - Raw age value from CSV (Age or Population_Age field)
   * @returns Standardized age group type list
   */
  static normalizeStudyStatus(studyStatus: string): StudyStatus {
    if (!studyStatus) return StudyStatus.UNKNOWN;

    const normalized = studyStatus.toLowerCase().trim();

    if (normalized.includes('ended')) {
      return StudyStatus.WITHDRAWN;
    }

    if (normalized.includes('halted')) {
      return StudyStatus.WITHHELD;
    }

    if (normalized.includes('completed')) {
      return StudyStatus.COMPLETED;
    }

    return StudyStatus.UNKNOWN;
  }

  static async loadAndProcessData(): Promise<ProcessedData> {
    try {
      // Load CSV files from the public folder
      const usData = await this.loadCSV(
        '/data/clinical-trials-gov-dataset.csv'
      );
      const euData = await this.loadCSV('/data/eudra-ct-dataset.csv');

      // Standardize column names and create TrialData objects
      const usTrials: TrialData[] = usData.map(trial => ({
        id: trial['NCT Number'] || '',
        title: trial['Study Title'] || '',
        source: 'US' as const,
        status: trial['Study Status']
          ? StudyStatus[trial['Study Status'] as keyof typeof StudyStatus]
          : StudyStatus.UNKNOWN,
        condition: trial.Conditions || '',
        sponsor: trial.Sponsor || '',
        startDate: trial['Start Date'] ? new Date(trial['Start Date']) : null,
        completionDate: trial['Completion Date']
          ? new Date(trial['Completion Date'])
          : null,
        gender: this.normalizeGender(trial.Sex || ''),
        ageGroup: this.normalizeAgeGroup(trial.Age || ''),
        location: trial.Locations || '',
        url: trial['Study URL'] || '',
        dataSource: DataSource.CLINICALTRIALS_GOV,
      }));

      const euTrials: TrialData[] = euData.map(trial => ({
        id: trial.EudraCT_Number || '',
        title: trial.Full_Title || '',
        source: 'EU' as const,
        status: this.normalizeStudyStatus(trial.Trial_Protocol || ''),
        condition: trial.Medical_Condition || trial.Disease || '',
        sponsor: trial.Sponsor_Name || '',
        startDate: trial.Start_Date ? new Date(trial.Start_Date) : null,
        completionDate: null,
        gender: this.normalizeGender(trial.Gender || ''),
        ageGroup: this.normalizeAgeGroup(trial.Population_Age || ''),
        location: 'EU',
        url: trial.Link || '',
        dataSource: DataSource.EUDRACT,
      }));

      const allTrials = [...usTrials, ...euTrials];

      // Count by categories
      const conditions: { [key: string]: number } = {};
      const sponsors: { [key: string]: number } = {};
      const statuses: { [key: string]: number } = {};

      allTrials.forEach(trial => {
        const condition = trial.condition || 'Unknown';
        conditions[condition] = (conditions[condition] || 0) + 1;

        const sponsor = trial.sponsor || 'Unknown';
        sponsors[sponsor] = (sponsors[sponsor] || 0) + 1;

        const status = trial.status || 'Unknown';
        statuses[status] = (statuses[status] || 0) + 1;
      });

      const result: ProcessedData = {
        trials: allTrials,
        totalTrials: allTrials.length,
        usTrials: usTrials.length,
        euTrials: euTrials.length,
        conditions,
        sponsors,
        statuses,
      };

      return result;
    } catch (error) {
      console.error('Error loading and processing data:', error);
      return {
        trials: [],
        totalTrials: 0,
        usTrials: 0,
        euTrials: 0,
        conditions: {},
        sponsors: {},
        statuses: {},
      };
    }
  }
}
