
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import questionsData from './question.json';
import { add_r } from '../redux/action';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import './Navbar.css';


const questions = questionsData.questions;

const RatingForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ratings, setRatings] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleRatingChange = (question, rating) => {
    setRatings(prevRatings => ({
      ...prevRatings,
      [question]: rating
    }));
  };

  const handleNext = () => {
    setCurrentQuestion(prevQuestion => prevQuestion + 1);
  };

  const handleSubmit = e => {
    e.preventDefault();
    Object.entries(ratings).forEach(([question, rating]) => {
      dispatch(add_r(question, rating));
    });
    console.log(ratings);
    navigate('/ree');
  };

  return (
    <div className="bg-image" style={{ backgroundImage: "url('https://mdbootstrap.com/img/Photos/Others/images/76.jpg')", height: "100vh" }}>
      <Container className="rating-form-container transparent-bg">
        <Form onSubmit={handleSubmit}>
          {currentQuestion < questions.length ? (
            <div>
              <p className="question">{questions[currentQuestion]}</p>
              <div className="response">
                <Form.Group className="response-group">
                  <Form.Check
                    type="radio"
                    id={`rating-very-often-${currentQuestion}`}
                    label="Very Often"
                    name={`rating-${currentQuestion}`}
                    value="Very Often"
                    onChange={() => handleRatingChange(questions[currentQuestion], "Very Often")}
                  />
                  <Form.Check
                    type="radio"
                    id={`rating-often-${currentQuestion}`}
                    label="Often"
                    name={`rating-${currentQuestion}`}
                    value="Often"
                    onChange={() => handleRatingChange(questions[currentQuestion], "Often")}
                  />
                  <Form.Check
                    type="radio"
                    id={`rating-sometimes-${currentQuestion}`}
                    label="Sometimes"
                    name={`rating-${currentQuestion}`}
                    value="Sometimes"
                    onChange={() => handleRatingChange(questions[currentQuestion], "Sometimes")}
                  />
                  <Form.Check
                    type="radio"
                    id={`rating-rarely-${currentQuestion}`}
                    label="Rarely"
                    name={`rating-${currentQuestion}`}
                    value="Rarely"
                    onChange={() => handleRatingChange(questions[currentQuestion], "Rarely")}
                  />
                  <Form.Check
                    type="radio"
                    id={`rating-never-${currentQuestion}`}
                    label="Never"
                    name={`rating-${currentQuestion}`}
                    value="Never"
                    onChange={() => handleRatingChange(questions[currentQuestion], "Never")}
                  />
                </Form.Group>
              </div>
              <Button buttonStyle='btn--outline' variant="primary" onClick={handleNext}>Next</Button>
            </div>
          ) : (
            <>
              <p>All questions answered. Thank you!</p>
              <Button buttonStyle='btn--outline' type="submit">Submit</Button>
            </>
          )}
        </Form>
      </Container>
    </div>
  );
};

export default RatingForm;
