import { AbstractType, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-mortgage',
    templateUrl: './mortgage.component.html',
    styleUrls: ['./mortgage.component.scss']
})
export class MortgageComponent implements OnInit {

    // Form.
    public form: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
    ) { }

    ngOnInit() {
        this.form = this.buildForm();
    }

    private buildForm(): FormGroup {

        return this.formBuilder.group({
            propertyValue: [{ value: 100, disabled: false }, [Validators.required]],
            depositValue: [{ value: 5, disabled: false }, [Validators.required]],
            otherFees: [{ value: true, disabled: false }, [Validators.required]],
            stampDuty: [{ value: 5, disabled: false }, [Validators.required]],
            legalFees: [{ value: 5, disabled: false }, [Validators.required]],
            mortgageBrokerFees: [{ value: 5, disabled: false }, [Validators.required]],
            mortgageCosts: [{ value: 5, disabled: false }, [Validators.required]],
            savings: [{ value: 5, disabled: false }, [Validators.required]],
            isAwareOfMonthlySavings: [{ value: true, disabled: false }, [Validators.required]],
            income: [{ value: 24000, disabled: false }, [Validators.required]],
            rent: [{ value: 0, disabled: false }, [Validators.required]],
            utilities: [{ value: 0, disabled: false }, [Validators.required]],
            subscriptions: [{ value: 0, disabled: false }, [Validators.required]],
            family: [{ value: 0, disabled: false }, [Validators.required]],
            leisure: [{ value: 0, disabled: false }, [Validators.required]],
            affordToSaveEachMonth: [{ value: 700, disabled: false }, [Validators.required]],
            desiredTimeOfPurchase: [{ value: 12, disabled: false }, [Validators.required]],
            riskTolerance: [{ value: 1, disabled: false }, [Validators.required]]
        })

    }


    public updateAffordToSaveEachMonth(): void {
        this.form.patchValue({ 
            affordToSaveEachMonth: this.totalMonthlySavingsFromUserInput
        });
    }



    get otherFees(): AbstractControl { return this.form.get('otherFees'); }
    get isAwareOfMonthlySavings(): AbstractControl { return this.form.get('isAwareOfMonthlySavings'); }
    get savings(): AbstractControl { return this.form.get('savings') }
    get income(): AbstractControl { return this.form.get('income'); }
    get rent(): AbstractControl { return this.form.get('rent'); }
    get utilities(): AbstractControl { return this.form.get('utilities'); }
    get subscriptions(): AbstractControl { return this.form.get('subscriptions'); }
    get family(): AbstractControl { return this.form.get('family'); }
    get leisure(): AbstractControl { return this.form.get('leisure'); }
    get affordToSaveEachMonth(): AbstractControl { return this.form.get('affordToSaveEachMonth'); }

    get showOtherFees(): boolean {
        try { if (this.otherFees.value === true) return true; else return false; }
        catch (error) { console.error(error); return false; }
    }

    get showIsAwareOfMonthlySavings(): boolean {
        try { if (this.isAwareOfMonthlySavings.value === true) return true; else return false; }
        catch (error) { console.error(error); return false; }
    }

    // Getters: Calculations
    get totalMonthlySavingsFromUserInput(): number {
        try {
            let savings: number = this.income.value/12 || 1500;
            savings -= this.rent.value;
            savings -= this.utilities.value;
            savings -= this.subscriptions.value;
            savings -= this.family.value;
            savings -= this.leisure.value;
            return savings;
        } catch (error) {
            console.error(error);
            return 10;
        }
    }

}
