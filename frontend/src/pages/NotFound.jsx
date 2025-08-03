import { Link } from "react-router-dom";
import { motion } from "framer-motion"

const NotFound = () => {
    return ( 
        <motion.div className="not-found"
            initial={{ opacity: 0, y:-70 }}
            whileInView={{ opacity: 1, y:0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
        >
            <h1>404 - Page Not Found</h1>
            <Link to='/' className="link">Back to the home page...</Link>
        </motion.div>
        // <motion.div 
        //     initial={{ opacity: 0 , y: -70}}
        //     whileInView={{ opacity: 1, y: 0 }}
        //     transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
        //     className="not-found"
        // >
            
        // </motion.div>
     );
}
 
export default NotFound;