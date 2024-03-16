import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

// import AppWebsiteVisits from '../elements/app-website-visits';
import AppWidgetSummary from '../../components/admin/elements/app-widget-summary';
import { useEffect, useState } from 'react';
import { baseUrl } from '../../utils/constants/Constants';
import axios from 'axios';
import { AdminDashBoardAPI } from '../../components/API/AdminAPI';

// import Iconify from '../elements/iconify/iconify';

// ----------------------------------------------------------------------

export default function Dashboard() {

  const [adminData, setadminData] = useState(null)

  useEffect ( () => {
    AdminDashBoardAPI.get().then((res) => {
      setadminData(res.data)
      console.log(res.data);
    }).catch((error)=>{
      console.log(error);
    })
  },[])
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Total Bookings"
            total={adminData?adminData.total_transactions:0}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Patients"
            total={adminData?adminData.total_patients:0}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Doctors"
            total={adminData?adminData.total_doctors:0}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Total Revenue"
            total={adminData?adminData.total_revenue:0}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>

        
      </Grid>
    </Container>
  );
}
