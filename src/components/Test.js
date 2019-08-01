import React, { Component } from 'react';
import {Test_Json} from './Test_Json';

class Test extends Component {

    constructor(props) {
        super(props);
        this.state = {       
            instance: 0,
            count: 0,
            options: [],
            finish: false,
            input: null
        };
      
      this.display = this.display.bind(this);  
      this.next = this.next.bind(this); 
    //   this.previousQuestionHandler = this.previousQuestionHandler.bind(this); 
      this.verify = this.verify.bind(this);
      this.finish = this.finish.bind(this);
      }


    display(){
        const {instance} = this.state;
        this.setState(()=>{
            return {
                questions: Test_Json[instance].question,
                options: Test_Json[instance].options,
                answers: Test_Json[instance].answer
            }
        })
    }

    componentDidMount(){
        this.display();
    }

    next(){

        const {input, answers, count} = this.state;

        this.setState({
            instance: this.state.instance + 1
        })

        if(input === answers){
            this.setState({
                count: count + 1
            })
        }
    }

    componentDidUpdate(prevProps, prevState){
        const {instance} = this.state;
        if(instance !== prevState.instance){
            this.setState(()=>{
                return {
                    questions: Test_Json[instance].question,
                    options: Test_Json[instance].options,
                    answers: Test_Json[instance].answer
                } 
            })
        }
    } 

    verify(answer){
        this.setState(
            {
                input: answer
            }
        )
    }

    finish(){
        const {input, answers, count} = this.state;
        if(this.state.instance === Test_Json.length - 1){
            this.setState({
                finish: true
            })
            if(input === answers){
                this.setState({
                    count: count + 1
                })
            }
        }
    }

    render() {
        const {questions, options, instance, input, finish, count} = this.state;

        if(finish) {
            return (
                <div className="result ">
                    <div className="top">
                        <h2 className="result_text">Your Result:</h2>
                        <p className="result_text">You answered <h3>{count}</h3> questions correctly out of <h3>{`${Test_Json.length}`}</h3></p>
                    </div>
                    <div className="bottom">
                        <h2 className="result_text">Correct answer's were : </h2>
                        <ul>
                            {Test_Json.map((item, index) => (
                                <h3><li className="result_text" key={index}>{index+1}. {item.answer}</li></h3>
                            ))}
                        </ul>
                    </div>
                </div>
            )
        }
        return (
            <div className="test_section">
                <h2>Click on any option and then click on the next button </h2>
                <h2 className="testQuestion">{`Question number: ${instance+1}`}</h2>
                <h2>{questions}</h2>
                <br/>
                    {options.map(option => (
                    <h3
                    key={option.id}
                    className= {`option_text ${input === option ? "selected" : null }`}
                    onClick={() => this.verify(option)}
                    >
                        {option}
                    </h3>))}
                    {/* {instance > 1 && 
                        <button onClick={this.previousQuestionHandler}>Previous</button>
                    }     */}
                    {instance < Test_Json.length -1 &&
                    <button onClick={this.next}><h3>Next</h3></button>    
                    }
                    {instance === Test_Json.length - 1 && 
                        <button onClick={this.finish}><h3>Finish</h3></button>
                    }    
            </div>
        );
    }
}
export default Test;