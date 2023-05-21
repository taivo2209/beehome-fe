import * as React from 'react';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import roomImg from '../../../../public/assets/images/room.jpg';
import disableRoom from '../../../../public/assets/images/disableRoom.png';

import { ButtonBase, Grid, Paper, Typography, styled } from '@mui/material';
import Image from 'next/image';
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
const DetailFloor = ({ setDetailIsOpen, data }) => {
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
      {data[0]?.floors?.map((itemFloor) => (
        <div key={`section-${itemFloor.floorNumber}`}>
          <ListSubheader>{`Floor ${itemFloor.floorNumber}`}</ListSubheader>
          <Grid
            container
            rowSpacing={5}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            pacing={2}
          >
            {itemFloor.rooms.map((item) => (
              <Paper
                onClick={() => setDetailIsOpen(item)}
                key={`item-${itemFloor.floorNumber}-${item.name}`}
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
                      <Image
                        src={roomImg}
                        alt=""
                        style={{
                          margin: 'auto',
                          display: 'block',
                          maxWidth: '100%',
                          maxHeight: '100%',
                        }}
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
                          Price : {item.price}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Acreage: {item.acreage}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Room: {item.name}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item></Grid>
                  </Grid>
                </Grid>
                {/* <Grid container spacing={2}>
                  <Grid item>
                    <ButtonBase sx={{ width: 128, height: 128 }}>
                      <Image
                        src={disableRoom}
                        alt=""
                        style={{
                          margin: 'auto',
                          display: 'block',
                          maxWidth: '100%',
                          maxHeight: '100%',
                        }}
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
                          Phòng đã được thuê
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Acreage: {item.acreage}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Room: {item.name}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid> */}
              </Paper>
            ))}
          </Grid>
        </div>
      ))}
    </List>
  );
};

export default DetailFloor;
