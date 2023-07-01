import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Check out our Pre-Diagnostic tests!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/Depression.png'
              text='Break the silence, embrace healing, and reclaim your life from depression'
              label='Depression'
              path='/services'
            />
            <CardItem
              src='images/Gas.png'
              text='Recognize, reject, and rise above gaslighting'
              label='Gaslighting'
              path='/services'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/Anxiety.png'
              text='Conquer anxiety, embrace peace within.'
              label='Anxiety'
              path='/services'
            />
            <CardItem
              src='images/ADHD.png'
              text='Unlock your potential, embrace your ADHD uniqueness'
              label='ADHD'
              path='/From1'
            />
            <CardItem
              src='images/ocd.png'
              text='Break free from OCD grip reclaim your peace of mind'
              label='OCD'
              path='/sign-up'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;

