import React, { useState } from 'react'
import { Button, Flag, Form, Grid, Icon, List, Modal, Segment } from 'semantic-ui-react'

export default function Home() {
	let x = []

	if (localStorage.getItem('list')) {
		x = JSON.parse(localStorage.getItem('list'))
	}
	const [list, setlist] = useState(x)
	const [fn, setfn] = useState('')
	const [vg, setvg] = useState('')
	const [mn, setmn] = useState('')
	const [wh, setwh] = useState('')
	const [dt, setdt] = useState('')
	const [at, setat] = useState('')
	const [box, setbox] = useState(false)

	function addItem() {
		if (fn === '' || vg === '' || mn === '' || wh === '' || dt === '' || at === '') {
			return
		}
		const farmer = {
			fn: fn,
			vg: vg,
			mn: mn,
			wh: wh,
			dt: dt,
			at: at,
		}
		const newlist = [...list]
		newlist.push(farmer)
		setlist(newlist)
		localStorage.setItem('list', JSON.stringify(newlist))
		setbox(false)
		setfn('')
		setvg('')
		setmn('')
		setwh('')
		setdt('')
		setat('')
	}

	function removeitem(index) {
		const newlist = [...list]
		newlist.splice(index, 1)
		setlist(newlist)
		localStorage.setItem('list', JSON.stringify(newlist))
	}
	return (
		<div style={{ padding: 20 }}>
			<Grid>
				<Grid.Column floated='left' width={1}>
					<Flag name='in' />
				</Grid.Column>
				<Grid.Column width={11}>
					<h2>BILAL FARMERS WORKING APP</h2>
				</Grid.Column>
				<Grid.Column width={1}>
					<Button icon color='green' onClick={() => { setbox(true) }}>
						<Icon name='plus' color='white' />
					</Button>
				</Grid.Column>
				<Grid.Column floated='right' width={1}>
					<Flag name='in' />
				</Grid.Column>
			</Grid>
			<Modal
				closeIcon
				open={box}
				onClose={() => setbox(false)}
				onOpen={() => setbox(true)}
			>
				<Segment>
					<Form>
						<Form.Input label='Farmer Name' type='text' value={fn} onChange={(e) => { setfn(e.target.value) }} />
						<Form.Input label='Village ' type='text' value={vg} onChange={(e) => { setvg(e.target.value) }} />
						<Form.Input label='Mobile Number' type='text' value={mn} onChange={(e) => { setmn(e.target.value) }} />
						<Form.Input label='Work Hours' type='text' value={wh} onChange={(e) => { setwh(e.target.value) }} />
						<Form.Input label='Amout' type='text' value={at} onChange={(e) => { setat(e.target.value) }} />
						<Form.Input label='Date' type='date' value={dt} onChange={(e) => { setdt(e.target.value) }} />
						<Button color='blue' onClick={addItem}>SUBMIT</Button>
					</Form>
				</Segment>
			</Modal>
			<List divided size='huge'>
				{
					list.map((item, index) => {
						return (
							<List.Item>
								<List.Content floated='right'>
									<Button color='red' icon onClick={() => { removeitem(index) }}>
										<Icon name='trash alternate' />
									</Button>
								</List.Content>
								<List.Content>
									<List.Header><Icon name='user' /> {item.fn}</List.Header>
									<List.Description><Icon name='map' /> {item.vg}</List.Description>
									<List.Description><Icon name='phone' /> {item.mn}</List.Description>
									<List.Description><Icon name='time' /> {item.wh}</List.Description>
									<List.Description><Icon name='rupee' /> {item.at}</List.Description>
									<List.Description><Icon name='calendar' /> {item.dt}</List.Description>
								</List.Content>
							</List.Item>
						)
					})
				}
			</List>
		</div>
	)
}
