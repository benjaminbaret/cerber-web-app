import supabase from '../../connexionDatabase/connectToDatabase';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import LinearProgress from '@mui/material/LinearProgress';

const ProgressBar = ({ progress }) => {
    return (
        <div style={{ textAlign: 'center' }}>
          <div style={{ marginTop: '-1px', color: '#FFA500' }}>{`${progress}%`}</div>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 15, // Set the height of the progress bar
              borderRadius: '6px', // Set border radius for rounded corners
              '& .MuiLinearProgress-bar': {
                borderRadius: '6px', // Set border radius for the progress bar itself
                backgroundColor: '#FAC818', // Set background color to orange
                width: '100%', // Set the width of the progress bar
              },
            }}
          />
        </div>
      );
    };

const DisplayContent = () => {
  const [data, setData] = useState<any[] | null>(null);
  const [error, setError] = useState<any | null>(null);

  const fetchData = async () => {
    try {
      const userIdString = Cookies.get('userIdCerberUpdate')?.toString();
      const userId = parseInt(userIdString as string, 10);
      const { data: deviceIdData, error } = await supabase.from('devices').select('*').eq('userId', userId);

      const deviceId = deviceIdData?.map((device) => device.id);

      const { data: deployement, error: errorDeployment } = await supabase
        .from('deployments')
        .select('*,devices(*),groups(*),updates(*)')
        .eq('status', true)
        .in('deviceId', deviceId)
        .order('id', { ascending: true });

      setData(deployement);
    } catch (errorDeployment) {
      setError(errorDeployment);
    }
  };

  useEffect(() => {
    // Appeler fetchData immédiatement
    fetchData();

    // Mettre en place une boucle avec setInterval pour appeler fetchData toutes les 100ms
    const intervalId = setInterval(() => {
      fetchData();
    }, 50);

    // Nettoyer l'intervalle lorsque le composant est démonté
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <tbody>
      {data?.map((deployment) => (
        <tr className="relative" key={deployment.id}>
          <td className="text-center w-1/5 pb-3">
            <ProgressBar progress={deployment.devices.updateProgress} />
          </td>
          <td className="text-center w-1/5">{deployment.devices.updateStatus}</td>
          <td className="text-center w-1/5">{deployment.devices.name}</td>
          <td className="text-center w-1/5">{deployment.updates.name}</td>
          <td className="text-center w-1/5">{deployment.groupId ? deployment.groups.name : '/'}</td>

          <style jsx>{`
            tr::after {
              content: "";
              position: absolute;
              left: 0;
              bottom: 0;
              width: 100%;
              height: 1px;
              background-color: #e2e8f0;
              opacity: 0.28;
            }
          `}</style>
        </tr>
      ))}
    </tbody>
  );
};

export default DisplayContent;
