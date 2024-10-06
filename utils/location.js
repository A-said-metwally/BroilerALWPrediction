
  // get user ip address
  const getIpAddress = async () => {
    try {
      const response = await fetch('https://api64.ipify.org?format=json');
      const data = await response.json();
      const userIp = data.ip;
      return userIp
    } catch (error) {
      console.error('Error fetching IP address:', error);
    }
  };
  
 export const fetchIpInfo = async () => {
    const urlKey = 'b80aac36682936'
    const ip = await getIpAddress()
    try {
      const response = await fetch(`https://ipinfo.io/${ip}?token=${urlKey}`);
      const data = await response.json();
      return {data, status:response.status};
    } catch (error) {
      console.error('Error fetching IP info:', error);
    }
  };
