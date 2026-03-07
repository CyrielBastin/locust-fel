import { afterEach, beforeEach, describe, expect, test } from 'vitest'
import { createApp } from '../lib/app'
import { nextTick } from '../lib/scheduler'
import { App } from './app'
import { singleHtmlLine } from './utils'

/** @type {import('../lib/app').Application} */
let app

beforeEach(() => {
  app = createApp(App)
})

afterEach(() => {
  document.body.innerHTML = ''
})

describe('when the application is mounted', () => {
  afterEach(async () => {
    await nextTick()
    app.unmount()
  })

  test('it shows a loading message', () => {
    app.mount(document.body)
    expect(document.body.innerHTML).toBe(singleHtmlLine`<p>Loading...</p>`)
  })

  test('it is rendered into the parent element', async () => {
    app.mount(document.body)
    await nextTick()

    expect(document.body.innerHTML).toBe(
      singleHtmlLine`
      <h1>Todos</h1>
      <input type="text">
      <button>Add</button>
      <ul>
        <li>
          <span>Eat a steak</span>
          <button>Done</button>
        </li>
        <li>
          <span>Drink a beer</span>
          <button>Done</button>
        </li>
      </ul>`
    )
  })
})

describe('when the application is unmounted', () => {
  beforeEach(async () => {
    app.mount(document.body)
    await nextTick()
  })

  test('it is removed from the parent element', async () => {
    app.unmount()
    await nextTick()

    expect(document.body.innerHTML).toBe('')
  })
})

describe('when the user adds a todo', () => {
  beforeEach(async () => {
    app.mount(document.body)
    await nextTick()

    writeInInput('Play darts')
    clickAddButton()

    await nextTick()
  })

  test('renders the new todo in read mode', () => {
    expect(document.body.innerHTML).toBe(
      singleHtmlLine`
        <h1>Todos</h1>
        <input type="text">
        <button>Add</button>
        <ul>
          <li>
            <span>Eat a steak</span>
            <button>Done</button>
          </li>
          <li>
            <span>Drink a beer</span>
            <button>Done</button>
          </li>
          <li>
            <span>Play darts</span>
            <button>Done</button>
          </li>
        </ul>`
    )
  })
})

describe('when the user removes a todo', () => {
  beforeEach(async () => {
    app.mount(document.body)
    await nextTick()

    clickDoneButton(0)
  })

  test('removes the todo from the list', () => {
    expect(document.body.innerHTML).toBe(
      singleHtmlLine`
        <h1>Todos</h1>
        <input type="text">
        <button>Add</button>
        <ul>
          <li>
            <span>Drink a beer</span>
            <button>Done</button>
          </li>
        </ul>`
    )
  })
})

function writeInInput(text) {
  document.querySelector('input').value = text
  document.querySelector('input').dispatchEvent(new Event('input'))
}

function clickAddButton() {
  document.querySelector('button').click()
}

function clickDoneButton(index) {
  document.querySelectorAll('li button')[index].click()
}
