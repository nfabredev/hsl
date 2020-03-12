import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { toReadableTime } from 'seconds-since-midnight';
import getStop from './queries/foo.gql';

const ShowStops = () => {
  const GET_STOPS = gql`
    ${getStop}
  `;
  const { data, loading, error } = useQuery(GET_STOPS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;
  const {
    stop: { stoptimesWithoutPatterns: nextArrivals, patterns: routes },
  } = data;
  const stopData = nextArrivals.map((n, i) => ({
    time: toReadableTime(n.realtimeArrival),
    bus: routes[i].route.shortName,
  }));
  console.log(stopData);

  const headers = Object.keys(stopData[0]).map(k => <th>{k}</th>);
  const content = stopData.map(d => (
    <tr>
      <td>
        {`${d.time.hours}h${d.time.minutes}
         ${d.time.meridian}`}
      </td>
      <td>{d.bus}</td>
    </tr>
  ));

  return (
    <>
      <table>
        <tr>{headers}</tr>
        {content}
      </table>
    </>
  );
};

export default ShowStops;
