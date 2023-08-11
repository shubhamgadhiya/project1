import React, { useEffect, useState } from 'react';
import axios from 'axios';

const electronicsItems = [
  { id: 1, name: 'Smartphone', price: '₹150000', image: "https://www.jio.com/medias/493177798-i-1-Digital-300Wx300H?context=bWFzdGVyfHJvb3R8NDYwNTF8aW1hZ2UvcG5nfGgzYy9oNWUvODg5MDE5OTA0ODIyMi5wbmd8NGE4NmUxY2VjYzJiYjUyNDkxMjc0YzIxNzU3NWUyMjIyMDIxZjRkYzAyYmRjZjdkZTk1Zjg1NzkyY2NlNmY4OQ" },
  { id: 2, name: 'Laptop', price: '₹250000', image: 'https://www.apple.com/newsroom/images/product/mac/standard/Apple_MacBook-Pro_16-inch-Screen_10182021_big_carousel.jpg.large.jpg' },
  { id: 3, name: 'Watch', price: '₹90000', image: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MQDY3ref_VW_34FR+watch-49-titanium-ultra_VW_34FR_WF_CO+watch-face-49-alpine-ultra_VW_34FR_WF_CO_GEO_IN?wid=5120&hei=3280&bgc=fafafa&trim=1&fmt=p-jpg&qlt=80&.v=MkFwcTgvOTFKREVPV3JHaUxZODhneEZPYUtzeTRQVVJ5RG0wcnpadi96OStTa01MdDFVOFdsNTBiaGt4Tnl3bTN2UDZvVDNqV1JlU0FIVjVNbXpUeXArcmJ2dmg4K2wxUFduUnBKNlZMczN5eExka1NTczgrKy80ZnkwVmFpbW1KVlBQa05Uc00ycDBPRHh5bVJ3cUgwSzgySUpseHY2YmYwNVhHWVk4TmZ0QUM0VzY0ZFZ0S21LTGc3Snk3TVBjOWE5RkJ2dEY1c1pRZkdGUUtnZHBSUTJWQzNBOENNazlEcEN3U3dWWkZFVT0' },
  { id: 4, name: 'Airpods', price: '₹25000', image: "https://images.macrumors.com/t/2oOomFnia-hmIfwvXVejKx3mNEE=/1600x/article-new/2019/10/airpods-pro-roundup.jpg"},
];

const Protected = () => {
  const imageStyle = {
    height: '150px',
    width: 'auto',  
  };
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('userToken');

    if (token) {
     
      const config = {
        headers: {
          Authorization: `${token}`,
        },
      };

      axios.get('http://localhost:5000/protected', config)
        .then(response => {
          setMessage(response.data);
        })
        .catch(error => {
          console.error('Error fetching protected data', error);
        });
    }
  }, []);

  return (
    <div>
      {message ? (
            <div>
            <h1>Electronics Items</h1>
            <ul style={{display:"flex", justifyContent:"space-around"}}>
              {electronicsItems.map(item => (
                <li style={{listStyle:"none"}} key={item.id}>
                  <img src={item.image} alt={item.name}  style={imageStyle}/>
                  <p style={{textAlign:"center"}}>{item.name}</p> 
                  <p style={{textAlign:"center"}}>{item.price}</p> 
                </li>
              ))}
            </ul>
          </div>
      ) : (
        <h2>Authentication Required</h2>
      )}
    
      
    </div>
  );
};

export default Protected;
