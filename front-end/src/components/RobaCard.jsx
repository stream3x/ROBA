
const RobaCard = ({ data }) => {

  return (
    <div className="roba-box">
      <div className="roba-box-img-section">
        <img src={data.photos[0]} />
      </div>
      <div className="roba-box-info-section">
        <h3>{data.robaName}</h3>
        <h6>A 2 chilometi da qui</h6>
      </div>
    </div>
  )
}

export default RobaCard;
