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

  const headers = Object.keys(stopData[0]).map(key => <th>{key}</th>);
  const content = stopData.map(
    ({ time: { hours, minutes, meridian }, bus }) => (
      <tr>
        <td>{`${hours}h${minutes} ${meridian}`}</td>
        <td>{bus}</td>
      </tr>
    )
  );

  return (
    <>
      <table>
        <thead>
          <tr>{headers}</tr>
        </thead>
        <tbody>{content}</tbody>
      </table>
    </>
  );
};

export default ShowStops;
