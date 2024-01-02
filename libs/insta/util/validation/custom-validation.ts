import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ZXCVBNFeedback, ZXCVBNResult, ZXCVBNScore } from 'zxcvbn';
import * as zxcvbn from 'zxcvbn';

export class CustomValidators {
	/**
	 * ONLY EXAMPLE: A Configured Validator
	 * Validator for checking if the value is at least the given length
	 * @param length The minimum length
	 */
	static min(length: number): ValidatorFn {
		return function (control: AbstractControl): ValidationErrors | null {
			// If the value is too short return an error object
			if (control.value.length < length) {
				return {
					minimum: true,
				};
			}

			// if the value is long enough return null
			return null;
		};
	}

	/**
	 * Validator for checking if the password is strong enough using `zxcvbn`
	 * @param minScore The minimum strength level
	 */
	static passwordStrength(minScore: number): ValidatorFn {
		return (control: AbstractControl): ValidationErrors | null => {
			const result: ZXCVBNResult = zxcvbn(control.value);
			const score: ZXCVBNScore = result.score;
			const feedback: ZXCVBNFeedback = result.feedback;

			console.log('passwordStrength', score);

			// If the password is not good enough return an error object
			if (score < minScore) {
				return {
					weak: {
						// valid: false,
						score,
						feedback,
					},
				};
			}

			// If the password is strong enough return null
			return null;
		};
	}

	/**
	 * Validator for checking if the two fields match
	 * @param matchTo The name of the other field
	 *
	 * We are trying to solve the problem that if the other control value changes
	 * my own validator should be called again.
	 *
	 * The solution involves a `Subscription` to the other control value
	 * and listen for changes.
	 */
	static match(matchTo: string): ValidatorFn {
		let thisControl: AbstractControl;
		let otherControl: AbstractControl;

		return (control: AbstractControl): ValidationErrors | null => {
			// 1. In the first call there is no parent control
			if (!control.parent) return null;

			// 2. In the second call there is a parent control
			if (!thisControl) {
				thisControl = control;
				otherControl = control.parent?.get(matchTo) as AbstractControl;

				// 2a. Set up subscription to update validity of this control when the other control changes
				otherControl.valueChanges.subscribe(() => {
					// If the other control changes call my own validator _AGAIN_
					thisControl.updateValueAndValidity({
						onlySelf: true,
						emitEvent: false,
					});
				});
			}

			// 3. From now on the validity is updated when ANY 2 control changes
			if (thisControl.value !== otherControl.value) {
				return {
					mismatch: true,
				};
			}

			// 4. If the values are equal return null
			return null;
		};
	}

	/**
	 * Group Validator for checking if the two passwords match
	 * @param controlName1 The first control
	 * @param controlName2 The second control
	 */
	static match2(controlName1: string, controlName2: string) {
		return (parent: AbstractControl): ValidationErrors | null => {
			// Get the values of the two controls from the perspective of the FormGroup
			const value1 = parent.get(controlName1)?.value;
			const value2 = parent.get(controlName2)?.value;

			// If the values are not equal return an error object
			if (value1 !== value2) {
				return {
					mismatch: true,
				};
			}

			// If the values are equal return null
			return null;
		};
	}
}

// Functional Programming
// --------------------------------------------------------------------------------------------
// Functions are First Class Citizens:
// - Functions can be passed around like variables
// - Functions can be stored in variables

// Higher Order Functions:
// - Functions can take Functions
// - Function can return Functions

// Closure:
// - Functions can access variables from the outer scope

// Examples
// --------------------------------------------------------------------------------------------

// 1. Just an ordinary Function
// (number) -> number

// Function Declaration
function add1(zahl: number): number {
	return zahl + 1;
}

// Function Expression
// const add1 = (zahl: number) => {
//   return zahl + 1;
// }

// 2. Higher Order Functions: Return a Function
// (number) -> (number) -> number
function add(zahl1: number) {
	return function (zahl2: number): number {
		return zahl1 + zahl2;
	};
}

// function add(zahl1: number) {
//   return (zahl2: number) => {
//     return zahl1 + zahl2;
//   }
// }

// 3. Higher Order Functions: Take a Function
// ((number) -> number) -> number
// function test(add1: (number) => number) {
//   const sum4 = add1(3);
//   return sum4;
// }

// 4. Call the Functions
// const add3Fn = add(3);
// const sum7 = add3Fn(4);
// const sum8 = add3Fn(5);
// const sum3 = add(1)(2);
