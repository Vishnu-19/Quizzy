import React, {Component} from "react";
import ReactDOM from "react-dom";
import "./assets/style.css";
import QuestionBox from "./components/QuestionBox";
import Result from "./components/Result";
import quizService from "./quizService";
class QuizBee extends Component{
    state = {
        quesBank:[],
        score: 0,
        responses: 0
    };
    getques =() =>{
        quizService().then(question =>{
            this.setState(
                {
                    quesBank:question
                }
            );
        });
    };
    computeAnswer=(answer,correctAnswer) => {
        if(answer ===correctAnswer){
            this.setState({
                score: this.state.score+1
            });
        }
        this.setState({
            responses:this.state.responses<5?this.state.responses+1:5 
        });
    };
    playAgain = () => {
        this.getques();
        this.setState(
            {
                score: 0,
                responses:0
            }
        );
    };
    componentDidMount()
    {
        this.getques();
    }
    render(){
        return (
            <div className="container">
                <div className="title">Quizbee </div>
                {this.state.quesBank.length >0 && this.state.responses < 5 &&
            this.state.quesBank.map(({question,answers,correct,questionId}) => (<QuestionBox
             question={question} 
             options={answers} 
             key={questionId}
             selected={answer => this.computeAnswer(answer,correct)}
             />))}
             {
                 this.state.responses === 5? <Result score={this.state.score} playAgain={this.playAgain} />:null}  
            </div>
        );
    }
}

ReactDOM.render(<QuizBee />,document.getElementById("root"));