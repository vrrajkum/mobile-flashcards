import React from 'react';
import { View, Text, StyleSheet, Platform,
  TouchableNativeFeedback, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { receiveEntries, addEntry } from '../actions';
import { timeToString, getDailyReminderValue } from '../utils/helpers';
import { fetchCalendarResults } from '../utils/api';
import UdaciFitnessCalendar from 'udacifitness-calendar';
import { white } from '../utils/colors';
import DateHeader from './DateHeader';
import MetricCard from './MetricCard';

class History extends React.Component {
  state = {
    loading: true
  }

  // Initialize Redux state with calendar entries
  async componentDidMount() {
    const entries = await fetchCalendarResults();
    const { dispatch } = this.props;

    dispatch(receiveEntries(entries));
    if (!entries[timeToString()]) {
      dispatch(addEntry({
        [timeToString()]: getDailyReminderValue()
      }));
    }

    this.setState({
      loading: false
    });
  }

  // Render a calendar item
  renderItem = ({ today, ...metrics }, formattedDate, key) => (
    <View style={styles.item}>
      {today
        ? <View>
            <DateHeader date={formattedDate} />
            <Text style={styles.noDataText}>
              {today}
            </Text>
          </View>
        : <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#eee')} onPress={() => console.log("Pressed!")}>
            {MetricCard(metrics, formattedDate)}
          </TouchableNativeFeedback>}
    </View>
  )

  // Render an empty calendar item
  renderEmptyDate = (formattedDate) => (
    <View style={styles.item}>
      <DateHeader date={formattedDate} />
      <Text style={styles.noDataText}>
        {"You didn't log any data on this day."}
      </Text>
    </View>
  )

  render() {
    const { entries } = this.props;
    const { loading } = this.state;

    if (loading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
      <UdaciFitnessCalendar
        items={entries}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
      />
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    }
  },
  noDataText: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20
  }
})

// Grab data from Redux store as props
const mapStateToProps = (entries) => ({
  entries
});

// Connect component to Redux store
export default connect(mapStateToProps)(History);