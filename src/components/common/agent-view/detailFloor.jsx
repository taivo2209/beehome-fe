import * as React from 'react';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import roomImg from '../../../../public/assets/images/room.jpg';
import disableRoom from '../../../../public/assets/images/disableRoom.png';

import { ButtonBase, Grid, Paper, Typography, styled } from '@mui/material';
import Image from 'next/image';
import useTrans from '../../../pages/hooks/useTran';
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
  const trans = useTrans();
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
      {data?.floors?.map((itemFloor) => (
        <div key={`section-${itemFloor.floorNumber}`}>
          <ListSubheader>{`${trans.lessor.houses.tang} ${itemFloor.floorNumber}`}</ListSubheader>
          <Grid
            container
            rowSpacing={5}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            pacing={2}
          >
            {itemFloor.rooms.map((item) => (
              <Paper
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
                {item.status == 'ACTIVE' ? (
                  <Grid
                    container
                    spacing={2}
                    onClick={() => setDetailIsOpen(item)}
                  >
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
                            {trans.lessor.rooms.gia_1} :{' '}
                            {item.price.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {trans.lessor.rooms.dien_tich}: {item.acreage}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {trans.lessor.rooms.ten_phong}: {item.name}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item></Grid>
                    </Grid>
                  </Grid>
                ) : (
                  <Grid container spacing={2}>
                    <Grid item>
                      <ButtonBase sx={{ width: 128, height: 128 }} disabled>
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
                            {trans.lessor.rooms.da_duoc_thue}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {trans.lessor.rooms.dien_tich}: {item.acreage}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {trans.lessor.rooms.ten_phong}: {item.name}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                )}
              </Paper>
            ))}
          </Grid>
        </div>
      ))}
    </List>
  );
};

export default DetailFloor;
