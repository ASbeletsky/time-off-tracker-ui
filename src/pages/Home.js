import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getMyRequests, getMyReviews } from '../components/Axios';
import { Context, Users } from '../Context';
import NewRequest from './NewRequest';
import ReviewsTable from '../components/OtherRequests/ReviewsTable';
import RequestTable from '../components/RequestTable';

function Home() {
  const [isLoading, setLoading] = useState(true);
  const [isNewRequestOpen, setNewRequestState] = useState(false);
  const [requests, setRequests] = useState(null);
  const [reviews, setReviews] = useState(null);

  let history = useHistory();
  const [context, setContext] = useContext(Context);
  const [users, setUsers] = useContext(Users);

  useEffect(() => {
    async function getRequests() {
      await getMyRequests().then(({ data }) => {
        const subData = data.slice(0, 3);
        setRequests(subData);
        if (context.role === 'Employee') {
          setLoading(false);
        }
      });
    }
    getRequests();

    if (context.role !== 'Employee') {
      async function getReviews() {
        await getMyReviews().then(({ data }) => {
          const subData = data.filter((item) => item.isApproved === null);
          setReviews(subData);
        });
        setLoading(false);
      }
      getReviews();
    }
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={{ flex: 0.8, margin: 5 }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <h2 style={{ marginBottom: 10, marginRight: 10 }}>My Recent Requests</h2>

          <Button
            variant="contained"
            color="primary"
            onClick={() => history.push('/my_requests')}
            style={{ marginRight: '150px', height: '30px', width: '100px', minWidth: '100px' }}>
            View All
          </Button>
          <Button
            className="home__new-request"
            variant="contained"
            style={{ height: '30px', width: '140px', minWidth: '140px' }}
            onClick={() => {
              setNewRequestState(true);
            }}>
            New request
          </Button>
        </div>

        {!users || !requests ? (
          <CircularProgress />
        ) : users && requests && requests.length > 0 ? (
          <RequestTable data={requests} users={users} short />
        ) : (
          <h3>No requests</h3>
        )}
      </div>

      {context.role !== 'Employee' ? (
        <div style={{ flex: 1, margin: 5, marginRight: 15 }}>
          <h2 style={{ marginBottom: 20 }}>
            New Requests For Approval ({reviews && reviews.length})
          </h2>
          {!users || !reviews ? (
            <CircularProgress />
          ) : users && reviews && reviews.length > 0 ? (
            <ReviewsTable data={reviews} users={users} short />
          ) : (
            <h3>No reviews</h3>
          )}
        </div>
      ) : null}
      <NewRequest
        isOpen={isNewRequestOpen}
        onClose={() => {
          setNewRequestState(false);
        }}
      />
    </div>
  );
}

export default React.memo(Home);
