
export interface ExpenseRecord{
	creation: string
	name: string
	modified: string
	owner: string
	modified_by: string
	docstatus: 0 | 1 | 2
	parent?: string
	parentfield?: string
	parenttype?: string
	idx?: number
	/**	Description : Data	*/
	description: string
	/**	Amount : Float	*/
	amount: number
	/**	Type : Select	*/
	type: "Credit" | "Debit"
	/**	Remarks : Small Text	*/
	remarks: string
	/**	Formatted Amount : Float	*/
	formatted_amount?: number
	/**	Invoice File : Attach	*/
	file?: string
}