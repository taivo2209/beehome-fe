import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import {
  Avatar,
  ButtonBase,
  Grid,
  Paper,
  Typography,
  styled,
} from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import Stack from '@mui/material/Stack';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});
const DetailFloor = ({ setDetailIsOpen }) => {
  return (
    <List
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: '60vh',
        '& ul': { padding: 2 },
      }}
      subheader={<li />}
    >
      {[0, 1, 2, 3, 4].map((sectionId) => (
        <div key={`section-${sectionId}`}>
          <ListSubheader>{`Floor ${sectionId}`}</ListSubheader>
          <Grid
            container
            rowSpacing={5}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            pacing={2}
          >
            {[
              0, 1, 2, 5, 6, 7, 8, 9, 10, 11, 12, 14, 12, 12, 12, 12, 12, 1, 21,
              2, 1, 2, 1, 21, 2, 1, 21, 2, 1, 2, 1, 2,
            ].map((item) => (
              <Paper
                onClick={() => setDetailIsOpen()}
                key={`item-${sectionId}-${item}`}
                sx={{
                  p: 2,
                  margin: '30px',
                  maxWidth: 200,
                  flexGrow: 1,
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                }}
              >
                <Grid container spacing={2}>
                  <Grid item>
                    <ButtonBase sx={{ width: 128, height: 128 }}>
                      <Img
                        alt="complex"
                        src="/static/images/grid/complex.jpg"
                      />
                    </ButtonBase>
                  </Grid>
                  <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs>
                        <Typography
                          gutterBottom
                          variant="subtitle1"
                          component="div"
                        >
                          Standard license
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          Full resolution 1920x1080 • JPEG
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          ID: 1030114
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography sx={{ cursor: 'pointer' }} variant="body2">
                          Remove
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" component="div">
                        $19.00
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            ))}
          </Grid>
        </div>
      ))}
    </List>
  );
};

export default DetailFloor;
