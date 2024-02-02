import React from 'react'
import '../styles/Contributions.css'
import axios from 'axios';

const Contributions = () => {

  const [contributions, setContributions] = React.useState([]);

  React.useEffect(() => {
    fetchContributions();
  }, []);

  const fetchContributions = async () => {
    try {
      await axios.get(`http://localhost:6001/fetch-contributions`).then(
        (res)=>{
            console.log(res.data);
            const contris = res.data.filter((contribution) => contribution.contributorId === localStorage.getItem('userId'));
            setContributions(contris);
        }
      )

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='ContributionsPage GenPagePadding'>
      <h3>Hello, {localStorage.getItem("username")}..!</h3>

      {contributions.length === 0?
        <h4>You've not made any contributions yet..</h4>
        :
        <>
          <h4>You've made {contributions.length} contributions till date..</h4>
          <div className="contributions_body">

            {contributions.map((contribution, index) => (
              <div key={index} className="contribution">
                <h5>{contribution.title}</h5>
                <span>
                  <b>Contribution: </b>
                  <p>{contribution.contribution}</p>            
                </span>
                <span>
                  <b>City: </b>
                  <p>{contribution.city}</p>
                </span>
                <span>
                  <b>Address: </b>
                  <p>{contribution.address}</p>
                </span>
                <span>
                  <b>Date: </b>
                  <p>{contribution.date.slice(0,10)}</p>
                </span>
              </div>
            ))}

          </div>
        </>
        }

    </div>
  )
}

export default Contributions