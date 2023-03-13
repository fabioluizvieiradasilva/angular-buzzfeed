import { Component } from '@angular/core';
import quizz_questions from "../../../assets/data/quizz-question.json"

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent {

  title:string=''
  question:any
  questionSelected:any
  answer:string[] = []
  answerSelected:string=''
  questionIndex:number=0
  questionMaxIndex:number=0
  finished: boolean = false

  playerChoose(alias:string){
    this.answer.push(alias);
    this.nextStep();
  }

  ngOnInit():void{
    if(quizz_questions){
      this.finished = false
      this.title = quizz_questions.title

      this.question = quizz_questions.questions
      this.questionSelected = this.question[this.questionIndex]

      this.questionIndex=0;
      this.questionMaxIndex = this.question.length;

    }

  }

  async nextStep(){
    this.questionIndex += 1
    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected =  this.question[this.questionIndex]
    } else {
      const finalAnswer:string = await this.checkResult(this.answer)
      this.finished = true
      this.answerSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results ]
    }
  }

  async checkResult(anwsers:string[]){

    const result = anwsers.reduce((previous, current, i, arr)=>{
        if(
          arr.filter(item => item === previous).length >
          arr.filter(item => item === current).length
        ){
          return previous
        }else{
          return current
        }
    })

    return result
  }

}
