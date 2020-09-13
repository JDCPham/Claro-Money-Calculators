import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { SimpleCompoundInterestResult } from '../../models';
import { SimpleVsCompoundInterestCalculatorService } from '../../services';

@Component({
    selector: 'simple-vs-compound-interest-graph',
    templateUrl: './simple-vs-compound-interest-graph.component.html',
    styleUrls: ['./simple-vs-compound-interest-graph.component.scss']
})
export class SimpleVsCompoundInterestGraphComponent implements OnInit {

    public options: any;

    @Input()
    public updated: EventEmitter<SimpleCompoundInterestResult>;

    constructor(private calculatorService: SimpleVsCompoundInterestCalculatorService) { }

    ngOnInit() {
        this.setChartOptions();
        this.setDataUpdateEventListener();
    }

    public onChartInit(event: any): void {
        this.updateChartData()
    }

    private setDataUpdateEventListener(): void {
        this.updated.subscribe(() => {
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
            },
            {
                type: 'line',
                name: 'Simple Interest Total Amount',
                symbol: 'circle',
                symbolSize: 4,
                smooth: true,
                areaStyle: {
                    color: 'rgba(0, 0, 255, 0.2)'
                },
                data: simpleInterestAmountData
            }]
        }
    }

    
}
