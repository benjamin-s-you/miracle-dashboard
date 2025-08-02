import React from 'react';
import {
  Typography,
  Box,
  Container,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';
import { Analytics, Dashboard } from '@mui/icons-material';
import { Link } from 'react-router-dom';

/**
 * HomePage component for the application.
 *
 * This component displays a welcome message and provides links to the Charts and Dashboards pages.
 */
export default function HomePage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'grey.50',
        p: 0,
      }}
    >
      <Container maxWidth="md" sx={{ py: 4 }}>
        {/* Welcome Message */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: 'primary.main',
              mb: 2,
            }}
          >
            Welcome to Miracle
          </Typography>

          <Typography variant="h6" component="h2" color="text.secondary">
            Explore US vs EU clinical trial trends with our comprehensive
            analytics platform
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: 4,
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'background.paper',
                boxShadow: 2,
              }}
            >
              <CardContent
                sx={{
                  textAlign: 'center',
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  p: 4,
                  pb: 2,
                  minHeight: '200px',
                }}
              >
                <Box sx={{ mb: 2 }}>
                  <Analytics sx={{ fontSize: 48, color: 'primary.main' }} />
                </Box>
                <Typography
                  variant="h5"
                  component="h3"
                  gutterBottom
                  sx={{ fontWeight: 'bold', mb: 2 }}
                >
                  Charts
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  View comprehensive charts and visualizations of clinical trial
                  data
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', pb: 4, px: 4 }}>
                <Button
                  component={Link}
                  to="/charts"
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  View Charts
                </Button>
              </CardActions>
            </Card>
          </Box>

          <Box sx={{ flex: 1 }}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'background.paper',
                boxShadow: 2,
              }}
            >
              <CardContent
                sx={{
                  textAlign: 'center',
                  flexGrow: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  p: 4,
                  pb: 2,
                  minHeight: '200px',
                }}
              >
                <Box sx={{ mb: 2 }}>
                  <Dashboard sx={{ fontSize: 48, color: 'secondary.main' }} />
                </Box>
                <Typography
                  variant="h5"
                  component="h3"
                  gutterBottom
                  sx={{ fontWeight: 'bold', mb: 2 }}
                >
                  Dashboards
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  View default dashboard
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', pb: 4, px: 4 }}>
                <Button
                  component={Link}
                  to="/dashboard/default"
                  variant="contained"
                  color="secondary"
                  size="large"
                >
                  View Dashboard
                </Button>
              </CardActions>
            </Card>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
