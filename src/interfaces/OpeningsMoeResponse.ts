export default interface OpeningsMoeResponse {
  uid: number
  title: string
  source: string
  file: string
  mime: Array<string>
  song: {
    title: string
    artist: string
  }
}
