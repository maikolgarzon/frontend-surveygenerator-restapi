import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Question, Option } from './tabulate';
import { ActivatedRoute } from '@angular/router';
import { TabulateService } from './tabulate.service';
import { Chart, registerables } from 'node_modules/chart.js';
Chart.register(...registerables)

@Component({
  selector: 'app-tabulatesurvey',
  templateUrl: './tabulatesurvey.component.html',
  styleUrls: ['./tabulatesurvey.component.css']
})
export class TabulatesurveyComponent implements OnInit {
  questions!: Question[];
  actualQuestion: Question = new Question;
  codeSurvey!: string | null;
  text!: string;
  nChart: Chart | undefined;

  constructor(private tabulateService: TabulateService, private route: ActivatedRoute, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.codeSurvey = this.route.snapshot.paramMap.get('codeSurvey');
    this.listQuestion();
  }

  public listQuestion() {
    this.tabulateService.getQuestions(this.codeSurvey).subscribe(
      (data) => {
        this.questions = data;
        this.actualQuestion = this.questions?.[0];
        this.tabulateData();
      }
    );
  }

  tabulateData() {
    let options: Option[] = this.actualQuestion.options;

    if (this.nChart) {
      this.nChart.destroy();
    }
    
    this.nChart = new Chart(('graphic'), {
      type: 'bar',
      data: {
        labels: options.map(row => row.description),
        datasets: [
          {
            label: 'Total responses',
            data: options.map(row => row.count),
            backgroundColor: 'rgba(0, 112, 255, 0.5)'
          }
        ]
      }
    });
  }
}


