import { EventEmitter, Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { SimpleVsCompoundInterestCalculatorService } from 'src/app/simple-vs-compound-interest';
import { SimpleCompoundInterestResult } from 'src/app/simple-vs-compound-interest/models/simple-compound-interest-result.model';

@Component({
  selector: 'compound-interest-graph',
  templateUrl: './compound-interest-graph.component.html',
  styleUrls: ['./compound-interest-graph.component.scss']
})
export class CompoundInterestGraphComponent implements OnInit {

  public options: any;

  @Input()
  public updated: EventEmitter<SimpleCompoundInterestResult>;

  constructor(private calculatorService: SimpleVsCompoundInterestCalculatorService) { }

  ngOnInit() {
      this.setChartOptions();
      this.setDataUpdateEventListener();
  }

  public onChartInit(event: any): void {
      this.updateChartData();
  }

  private setDataUpdateEventListener(): void {
      this.updated.subscribe((value: SimpleCompoundInterestResult) => {
         this.updateChartData();
      })
  }

  private updateChartData(): void {
    const data: SimpleCompoundInterestResult = this.calculatorService.results;
    const compoundInterestAmountData: Array<[number, number]> = data.detailed.map(result => [result.month, result.amount.compound.rounded]);
    const simpleInterestAmountData: Array<[number, number]> = data.detailed.map(result => [result.month, result.amount.simple.rounded]);
    this.setChartOptions(compoundInterestAmountData, simpleInterestAmountData)
  }

  private setChartOptions(
      compoundInterestAmountData: Array<[number, number]> = [],
      simpleInterestAmountData: Array<[number, number]> = []): any {
      this.options = {
          legend: {
              type: 'plain'
          },
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'cross',
                  snap: true,
                  label: {
                      backgroundColor: '#000'
                  }
              }
          },
          xAxis: {
              type: 'value',
              max: 'dataMax'
          },
          yAxis: {
              type: 'value',
              min: 'dataMin'
          },
          series: [{
              type: 'line',
              name: 'Compound Interest Total Amount',
              symbol: 'circle',
              symbolSize: 4,
              smooth: true,
              areaStyle: {
                  color: 'rgba(255, 0, 0, 0.2)'
              },
              data: compoundInterestAmountData
          }]
      }
  }


}
