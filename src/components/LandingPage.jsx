import React from 'react';
import { useNavigate } from 'react-router-dom';
import UpdateIcon from '@mui/icons-material/Update';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import '../componentStyling/LandingPage.scss';

const LandingPage = () => {
  let navigate = useNavigate();

  const featureBox = (icon, heading, subheading) => {
    return (
      <div className="feature-box">
        {icon}
        <h4>{heading}</h4>
        <p>{subheading}</p>
      </div>
    );
  };

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
            Metrics, get your fresh metrics here! Anyone who has metrics really
            really desperately needs this app.
          </p>
          <button className="primary-btn">Signup for free!</button>
          <a href="https://github.com/oslabs-beta/cloudband" target="_blank">
            <button className="secondary-btn">Contribute</button>
          </a>
        </div>
        <img
          src="https://s3-alpha.figma.com/hub/file/948140848/1f4d8ea7-e9d9-48b7-b70c-819482fb10fb-cover.png"
          alt="hero-image"
        />
      </div>
      <div className="features section">
        <div className="row">
          <h3>Features</h3>
        </div>
        <div className="row">
          {featureBox(<UpdateIcon fontSize="large" />, 'Heading', 'Subheading')}
          {featureBox(
            <QueryStatsIcon fontSize="large" />,
            'Heading',
            'Subheading'
          )}
          {featureBox(
            <CompareArrowsIcon fontSize="large" />,
            'Heading',
            'Subheading'
          )}
        </div>
      </div>
      <div className="highlights section">
        {highlight(
          'text-left',
          'Something something something and then some more something for you to consider',
          'And some more detail here',
          'https://s3-alpha.figma.com/hub/file/948140848/1f4d8ea7-e9d9-48b7-b70c-819482fb10fb-cover.png',
          'placeholder image'
        )}
        {highlight(
          'text-right',
          'Something something something and then some more something for you to consider',
          'And some more detail here',
          'https://s3-alpha.figma.com/hub/file/948140848/1f4d8ea7-e9d9-48b7-b70c-819482fb10fb-cover.png',
          'placeholder image'
        )}
        {highlight(
          'text-left',
          'Something something something and then some more something for you to consider',
          'And some more detail here',
          'https://s3-alpha.figma.com/hub/file/948140848/1f4d8ea7-e9d9-48b7-b70c-819482fb10fb-cover.png',
          'placeholder image'
        )}
      </div>
      <div className="team section">
        <h3>Our Team</h3>
        <div className="row">
          {teamMember(
            'https://cloudband.s3.amazonaws.com/camille_salter_headshot.png',
            'Camille Salter',
            '#',
            '#'
          )}
          {teamMember(
            'https://cloudband.s3.amazonaws.com/caroline_kimball_headshot.png',
            'Caroline Kimball',
            '#',
            '#'
          )}
          {teamMember(
            'https://cloudband.s3.amazonaws.com/greg_jenner_portrait.png',
            'Greg Jenner',
            '#',
            '#'
          )}
          {teamMember(
            'https://cloudband.s3.amazonaws.com/john_donovan_headshot.png',
            'John Donovan',
            '#',
            '#'
          )}
          {teamMember(
            'https://cloudband.s3.amazonaws.com/tomas_kim_headshot.png',
            'Tomas Kim',
            '#',
            '#'
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
