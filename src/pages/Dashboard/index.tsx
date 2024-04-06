import React, { Component, useEffect, useRef, useState } from "react"
import axios from "axios"
import { Decrypt, groupBy } from "src/utils/demo"
import styles from "./index.module.less"

export default function index() {
  const [pageList, setPageList] = useState({
    page_now: 1,
    page_size: 30
  })
  const wrapRef = useRef()
  const [resp, setResp] = useState([])

  return <div>hello world</div>
}
