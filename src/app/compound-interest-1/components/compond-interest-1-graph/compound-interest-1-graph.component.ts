import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { MonthlyInterestResult } from 'src/app/shared';
import { SimpleCompoundInterestResult } from '../../models';
import { SimpleVsCompoundInterestCalculatorService } from '../../services';

@Component({
    selector: 'compound-interest-1-graph',
    templateUrl: './compound-interest-1-graph.component.html',
    styleUrls: ['./compound-interest-1-graph.component.scss']
})
export class CompoundInterest1GraphComponent implements OnInit {

    public options: any;

    @Input()
    public updated: EventEmitter<Array<MonthlyInterestResult>>;

    constructor(private calculatorService: SimpleVsCompoundInterestCalculatorService) { }

    ngOnInit() {
        this.setChartOptions();
        this.setDataUpdateEventListener();
    }

    public onChartInit(event: any): void {
        this.updateChartData(null)
    }

    private setDataUpdateEventListener(): void {
        this.updated.subscribe((results: Array<MonthlyInterestResult>) => {
            this.updateChartData(results);

        })
    }

    private updateChartData(results: Array<MonthlyInterestResult>): void {
        try {
            if (results == null) return;
            const compoundInterestAmountData: Array<[number, number]> = results.map(result => [result.month, result.amount.compound.rounded]);
            const simpleInterestAmountData: Array<[number, number]> = results.map(result => [result.month, result.amount.simple.rounded]);
            this.setChartOptions(compoundInterestAmountData, simpleInterestAmountData)
        } catch {};
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
