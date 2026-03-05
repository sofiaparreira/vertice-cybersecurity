
import styles from './serviceCard.module.css'

const ServiceCard = ({ title, description, graphic, translatePosition, className = '', style = {} }) => {
  const isNumericTranslate = /^-?\d+(\.\d+)?$/.test(String(translatePosition ?? '0'))
  const translateY = isNumericTranslate
    ? `${Number(translatePosition ?? 0) * 0.25}rem`
    : (translatePosition || '0rem')

  const transformParts = [style?.transform, `translateY(${translateY})`].filter(Boolean)
  const mergedStyle = {
    ...style,
    transform: transformParts.join(' '),
  }

  return (
    <div
      className={`${styles.primaryGlow} bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl h-[500px] w-full p-6 shadow-[0_8px_40px_rgba(0,0,0,0.4)] flex flex-col ${className}`}
      style={mergedStyle}
    >
      <div>
        <h3 className="text-white text-lg font-semibold mb-2">
          {title}
        </h3>

        <p className="text-white/70 text-sm leading-relaxed">
          {description}
        </p>
      </div>

      {graphic && (
        <div className="bottom-0 absolute">
          {graphic}
        </div>
      )}

    </div>
  )
}
export default ServiceCard;