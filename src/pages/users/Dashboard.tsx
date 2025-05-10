import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { supabase } from '../../utils/supabaseClient';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/react';

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [requests, setRequests] = useState<any[]>([]);
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const session = await supabase.auth.getSession();
      if (!session.data.session) {
        history.push('/login');
        return;
      }

      const user_id = session.data.session.user.id;

      const { data: userData } = await supabase
        .from('users')
        .select('id,full_name,email,course,cellphone_number,gender,status')
        .eq('id', user_id)
        .single();

      if (userData) setUser(userData);

      const { data: requestData } = await supabase
        .from('user_requests')
        .select('id,request_id,status,date_requested,total_price,description,request_types(request_name)')
        .eq('user_id', user_id);

      if (requestData) setRequests(requestData);

      const { data: feedbackData } = await supabase
        .from('feedbacks')
        .select('id,feedback,rating,created_at,feedback_replies(reply,created_at)')
        .eq('user_id', user_id);

      if (feedbackData) setFeedbacks(feedbackData);
    };

    fetchData();
  }, [history]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    history.push('/login');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>User Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="ion-text-end">
          <IonButton color="primary" routerLink="/email">Email</IonButton>
          <IonButton color="primary" routerLink="/create-request">Create Request</IonButton>
          <IonButton color="primary" routerLink="/send-feedbacks">Share Feedbacks</IonButton>
          <IonButton color="danger" onClick={handleLogout}>Logout</IonButton>
        </div>

        {user && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Welcome, {user.full_name}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Course:</strong> {user.course}</p>
              <p><strong>Cellphone Number:</strong> {user.cellphone_number}</p>
              <p><strong>Gender:</strong> {user.gender}</p>
              <p><strong>Status:</strong> {user.status}</p>
            </IonCardContent>
          </IonCard>
        )}

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Your Requests</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            {requests.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>Request Name</th>
                    <th>Status</th>
                    <th>Date Requested</th>
                    <th>Total Price</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((req) => (
                    <tr key={req.id}>
                      <td>{req.request_types?.request_name || 'N/A'}</td>
                      <td>{req.status}</td>
                      <td>{new Date(req.date_requested).toLocaleDateString()}</td>
                      <td>₱{req.total_price?.toFixed(2)}</td>
                      <td>{req.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No requests found.</p>
            )}
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Your Feedbacks</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            {feedbacks.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>Feedback</th>
                    <th>Rating</th>
                    <th>Submitted At</th>
                    <th>Replies</th>
                  </tr>
                </thead>
                <tbody>
                  {feedbacks.map((fb) => (
                    <tr key={fb.id}>
                      <td>{fb.feedback}</td>
                      <td>{fb.rating}/5</td>
                      <td>{new Date(fb.created_at).toLocaleDateString()}</td>
                      <td>
                        {fb.feedback_replies?.length > 0 ? (
                          fb.feedback_replies.map((r: any, i: number) => (
                            <div key={i}>{r.reply} <small>({new Date(r.created_at).toLocaleDateString()})</small></div>
                          ))
                        ) : (
                          'No reply yet.'
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No feedbacks found.</p>
            )}
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;