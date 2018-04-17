import request from "superagent"

/**
 * Запуск загрузки счетчика B.
 * @type {String}
 */
const C_LOADING = "example/C_LOADING"

/**
 * Счетчик B загружен.
 * @type {String}
 */
const C_LOADED = "example/C_LOADED"

/**
 * Ошибка зарузки счетчика B.
 * @type {String}
 */
const C_LOADING_ERROR = "example/C_LOADING_ERROR"

/**
 * Запуск загрузки счетчика B.
 * @return {Promise} Объект для ожидания загрузки.
 */
export const loadC = () => (dispatch, getState) => {
  if (getState().incrementC.wait) {
    // Загрузка уже идет.
    return Promise.resolve()
  }

  dispatch({type: C_LOADING})

  const promise = request.get("increment/c")
  const result = promise
    .then(response => {
      if (getState().incrementC.wait) {
        dispatch({type: C_LOADED, payload: response.body})
      }
    })
    .catch(error => {
      dispatch({type: C_LOADING_ERROR, payload: error.message || "Ошибка"})
      throw error
    })

  result.request = result
  return result
}

/**
 * Запуск инкремента счетчика B.
 * @return {Promise} Объект для ожидания результата.
 */
export const doIncrementC = () => (dispatch, getState) => {
  if (getState().incrementC.wait) {
    // Загрузка уже идет.
    return Promise.resolve()
  }

  dispatch({type: C_LOADING})

  const promise = request.put("increment/c")
  const result = promise
    .then(response => {
      if (getState().incrementC.wait) {
        dispatch({type: C_LOADED, payload: response.body})
      }
    })
    .catch(error => {
      dispatch({type: C_LOADING_ERROR, payload: error.message || "Ошибка"})
      throw error
    })

  result.request = result
  return result
}

// Redux-преобразователь для счетчика B.
export default function incrementC(state = {
  wait: false,
  value: null,
  error: null
}, action) {
  switch (action.type) {
    case C_LOADING:
      return {
        ...state,
        wait: true,
        error: null
      }
    case C_LOADED:
      return {
        ...state,
        ...action.payload,
        wait: false
      }
    case C_LOADING_ERROR:
      return {
        ...state,
        wait: false,
        error: action.payload
      }
    default:
      return state
  }
}
