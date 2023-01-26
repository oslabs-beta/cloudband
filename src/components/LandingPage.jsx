import React from 'react';
import { useNavigate } from 'react-router-dom';
import UpdateIcon from '@mui/icons-material/Update';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import '../componentStyling/LandingPage.scss';

const LandingPage = () => {
  const navigate = useNavigate();

  // redirects to get-started when sign up button is clicked
  const redirectToDemo = (event) => {
    return navigate('/visualizer');
  };

  // reusable component highlighting a feature of the app
  const featureBox = (icon, heading, subheading) => {
    return (
      <div className="feature-box">
        {icon}
        <h4>{heading}</h4>
        <p>{subheading}</p>
      </div>
    );
  };

  // reusable component that renders text and a larger picture grouped horizontally
  const highlight = (
    orientation,
    primaryText,
    subText,
    imgLink,
    imgAltText
  ) => {
    if (orientation === 'text-left') {
      return (
        <div className="row">
          <div className="highlight-text column">
            <p className="highlight-primary-text">{primaryText}</p>
            <p className="highlight-subtext">{subText}</p>
          </div>
          <img src={imgLink} alt={imgAltText} className="highlight-img" />
        </div>
      );
    } else if (orientation === 'text-right') {
      return (
        <div className="row">
          <img src={imgLink} alt={imgAltText} className="highlight-img" />
          <div className="highlight-text column">
            <p className="highlight-primary-text">{primaryText}</p>
            <p className="highlight-subtext">{subText}</p>
          </div>
        </div>
      );
    } else {
      console.log('Error: no orientation specified on highlight component');
    }
  };

  // reusable component that renders team member information
  const teamMember = (imgLink, name, github, linkedIn) => {
    return (
      <div className="team-member-box">
        <img src={imgLink} alt={name} className="headshot" />
        <h4>{name}</h4>
        <p className="team-title">Software Engineer</p>
        <div className="row">
          <a href={github} target="_blank">
            <GitHubIcon />
          </a>
          <a href={linkedIn} target="_blank">
            <LinkedInIcon />
          </a>
        </div>
      </div>
    );
  };

  return (
    <div className="landing-page-wrapper">
      <div className="hero section row">
        <div className="column">
          <h2>An AWS Metric Visualizer</h2>
          <p className="subheading">
            Optimize your AWS resource efficiency by viewing your EC2 metrics
            and Lambda function data in one centralized interface.
          </p>
          <button className="primary-btn" onClick={redirectToDemo}>
            Try the Demo
          </button>
          <a href="https://github.com/oslabs-beta/cloudband" target="_blank">
            <button className="secondary-btn">Contribute</button>
          </a>
        </div>
        <img
          src="https://cloudband.s3.amazonaws.com/Cloudband_homepage_screenshot.png"
          alt="Cloudband-app-screenshot"
        />
      </div>
      <div className="features section">
        <div className="row">
          <h3>Features</h3>
        </div>
        <div className="row">
          {featureBox(
            <UpdateIcon fontSize="large" />,
            'Your most recent data at your fingertips',
            'With each login, your most recent data will be fetched and displayed.'
          )}
          {featureBox(
            <QueryStatsIcon fontSize="large" />,
            'Compare metrics across instances',
            'Hide or display instances to compare only the data you want to see.'
          )}
          {featureBox(
            <CompareArrowsIcon fontSize="large" />,
            'Switch between EC2 or Lambda data with just a click',
            'Toggle between views to see all your data in the same console.'
          )}
        </div>
      </div>
      <div className="highlights section">
        {highlight(
          'text-left',
          'Conventiently compiled EC2 Metric Datasets',
          'With two tailored views, you can see all of your CPU or Network In/Out data for all of your EC2 Instances at a glance.',
          'https://cloudband.s3.amazonaws.com/Cloudband_toggle-ec2-metrics-cropped.gif',
          'toggle-ec2-metrics-gif'
        )}
        {highlight(
          'text-right',
          'Compare between all EC2 instances or just the ones you want to see',
          "By clicking on the instance id, you can easily toggle an instance's data on or off to view only what you want to see.",
          'https://cloudband.s3.amazonaws.com/Cloudband_toggleEC2instances_cropped.gif',
          'toggle-ec2-instances-gif'
        )}
        {highlight(
          'text-left',
          'Easily toggle between EC2 Metrics and Lambda functions',
          'The Cloudband interface allows you to seamlessly switch between your EC2 and Lambda metrics for a more convenient way to view your data.',
          'https://cloudband.s3.amazonaws.com/Cloudband-toggle-lambda-functions.gif',
          'placeholder image'
        )}
      </div>
      <div className="team section" id="team-section">
        <h3>Our Team</h3>
        <div className="row">
          {teamMember(
            'https://cloudband.s3.amazonaws.com/camille_salter_headshot.png',
            'Camille Salter',
            'https://github.com/CamSalter',
            'https://www.linkedin.com/in/camille-salter'
          )}
          {teamMember(
            'https://cloudband.s3.amazonaws.com/caroline_kimball_headshot.png',
            'Caroline Kimball',
            'https://github.com/kimballcaroline',
            'https://www.linkedin.com/in/kimballcaroline'
          )}
          {teamMember(
            'https://cloudband.s3.amazonaws.com/greg_jenner_portrait.png',
            'Greg Jenner',
            'https://github.com/gregjenner',
            'https://www.linkedin.com/in/greg-o-jenner'
          )}
          {teamMember(
            'https://cloudband.s3.amazonaws.com/john_donovan_headshot.png',
            'John Donovan',
            'https://github.com/jodonovan845',
            'https://www.linkedin.com/in/john-d-donovan'
          )}
          {teamMember(
            'https://cloudband.s3.amazonaws.com/tomas_kim_headshot.png',
            'Tomas Kim',
            'https://github.com/tk0885',
            'https://www.linkedin.com/in/tomasjskim'
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
