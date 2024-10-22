import React, { Component } from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Grid,
  Column,
  Loading,
} from '@carbon/react';
import { InfoSection, InfoCard } from '../../components/Info';
import { Globe, Application, PersonFavorite } from '@carbon/react/icons';

import watsonx1 from './images/watsonx0.png'; // Import the image file
import watsonx2 from './images/watsonx2.png'; // Import the image file

import axios from 'axios';
import './HomePage.css'; // Import the CSS file for styling

class HomePage extends Component {
  static myBaseURL = process.env.REACT_APP_API_URL || '';

  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <Grid className="loan-list" fullWidth>
        <Column lg={16} md={8} sm={4} className="loan-list__banner ">
          <h3 className="loan-list__heading">&nbsp;</h3>
        </Column>
        <Column lg={16} md={8} sm={4} className="loan-list__banner ">
          <p>&nbsp;</p>
          <h3 className="loan-list__heading">Welcome !!!</h3>
        </Column>
        <Column lg={16} md={8} sm={4} className="loan-list__r2">
          <Grid className="tabs-group-content">
            <Column md={4} lg={8} sm={4} className="loan-list__tab-content">
              <br />
              <p className="loan-list__p">
                This demo showcases how watsonx generative ai capabilities can
                help transform the underwriting capabilities to reduce risk ,
                cut costs and increase profitability
              </p>
            </Column>
            <Column md={4} lg={{ span: 8, offset: 9 }} sm={4}>
              <img
                className="loan-list__illo"
                src={watsonx1}
                alt="Carbon illustration"
                height={550}
              />
            </Column>
          </Grid>
        </Column>
      </Grid>
    );
  }
}
export default HomePage;
