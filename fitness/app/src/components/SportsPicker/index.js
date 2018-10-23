import React, { Component } from "react";
import { withRouter } from "react-router";
import { Text } from "@sitecore-jss/sitecore-jss-react";
import SportOption from "../SportOption";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import ContinueButton from "../ContinueButton";
import { canUseDOM } from "../../utils";
import { translate } from "react-i18next";
import { setSportsPreferences } from "../../utils/XConnectProxy";

class SportsPicker extends Component {
  state = {
    selectedSports: {},
    selectedItemKey: null
  };

  constructor(props) {
    super(props);
    this.onCardClick = this.onCardClick.bind(this);
    this.onSliderChange = this.onSliderChange.bind(this);
    this.handleContinueClick = this.handleContinueClick.bind(this);
  }

  onCardClick(key, remove) {
    if (remove) {
      this.setState({ selectedItemKey: null });
      this.updateSelectedSports(key, null);
    } else {
      this.setState({ selectedItemKey: key });
      this.updateSelectedSports(key, undefined);
    }
  }

  handleContinueClick(event) {
    setSportsPreferences()
      .then(response => {
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  updateSelectedSports(key, value) {
    let selectedSports = this.state.selectedSports;

    if (value == null && Object.keys(selectedSports).includes(key)) {
      delete selectedSports[key];
    } else {
      selectedSports[key] = value !== undefined ? value : 5;
    }

    this.setState({ selectedSports });

    if (canUseDOM) {
      localStorage.setItem("sports", JSON.stringify(selectedSports));
    }
  }

  onSliderChange(value) {
    this.updateSelectedSports(this.state.selectedItemKey, value);
  }

  render() {
    const { selectedSports, selectedItemKey } = this.state;
    const { fields, t } = this.props;

    const anySportSelected = Object.keys(selectedSports).length > 0;
    const sliderValue = selectedItemKey ? selectedSports[selectedItemKey] : 5;

    const selectedSport = fields.sports.find(
      s => s.fields.Name.value === selectedItemKey
    );

    const canContinue = Object.keys(selectedSports).length > 0;

    return (
      <React.Fragment>
        <div className="sportPicker">
          <div className="sportPicker-header">
            <Text field={fields.title} tag="h4" className="sportPicker-title" />
          </div>

          <div className="sportPicker-options">
            {fields.sports.map((sport, index) => (
              <SportOption
                key={index}
                data={sport}
                selected={selectedSports[sport.fields.Name.value] !== undefined}
                onCardClick={this.onCardClick}
              />
            ))}
          </div>
        </div>

        {selectedSport && anySportSelected ? (
          <div className="sportSkill">
            <div className="sportSkill-header">
              <p className="sportSkill-title">
                {fields.selectSkillTitle.value.replace(
                  "$selected-sport",
                  selectedSport.fields.Name.value
                )}
              </p>
            </div>

            <div className="sportSkill-content">
              <div className="sportSkill-slider">
                <Slider
                  step={1}
                  min={1}
                  max={10}
                  value={sliderValue}
                  onChange={this.onSliderChange}
                />
              </div>
              <div className="sportSkill-legends">
                <div className="sportSkill-legend sportSkill-legend_left">
                  {t("beginner")}
                </div>
                <div className="sportSkill-legend sportSkill-legend_right">
                  {t("expert")}
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <div className="sportPicker-actions">
          <ContinueButton
            disabled={!canContinue}
            onContinue={this.handleContinueClick}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(translate()(SportsPicker));