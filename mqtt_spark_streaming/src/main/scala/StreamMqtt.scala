
/**
  * Created by josep2 on 10/18/16.
  */
import org.apache.spark.SparkConf
import org.apache.spark.streaming.{Seconds, StreamingContext}
import org.apache.spark.streaming.mqtt._
import org.apache.spark.storage.StorageLevel
import org.apache.log4j.{Level, Logger}
import org.apache.spark.sql.{DataFrame, SQLContext, SparkSession}

object StreamMqtt extends App {
  // Create a Spark Context
  val conf = new SparkConf().setAppName("Total Ecommerce Engine")
    .setMaster("local[4]").set("spark.executor.memory", "2g")

  // Turn off logs for demonstration purposes
  Logger.getLogger("org").setLevel(Level.OFF)
  Logger.getLogger("akka").setLevel(Level.OFF)

  // Stream every 5 seconds

  val ssc = new StreamingContext(conf, Seconds(5))

  // Listen on the hand_motion topic and stream data
  val lines = MQTTUtils.createStream(ssc, "tcp://localhost:1883", "hand_motion", StorageLevel.MEMORY_ONLY_SER_2)


  case class Points(x: String, y: Double)

  // Convert JSON to A Dataframe and calculate summary statistics

  lines.foreachRDD { rdd =>

    val spark = SparkSession.builder.config(rdd.sparkContext.getConf).getOrCreate()
    import spark.implicits._
    val stepOne = spark.sqlContext.read.json(rdd).toDF()

    printDescription(stepOne, "y").show()


  }

  // Attempt to calculate the summary statistics and return data otherwise

  def printDescription(data: DataFrame, col: String) = {
    try{
      data.describe(col)
    } catch {
      case e: Exception => data
    }
  }

  ssc.start()
  ssc.awaitTermination()
}
