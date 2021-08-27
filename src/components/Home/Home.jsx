import { react } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

export function Home(){
    
    return (
        <div className='home-app'>
            <Link to ='/Products'><button class='btn-primary btn-lg btn-home' > View Products </button></Link>          </div>
            
   )
}