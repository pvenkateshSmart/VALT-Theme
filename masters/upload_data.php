<?php
$db = mysqli_connect("10.60.1.71", "root", "Boss@8055","adityalibrary") or die("Could not connect123.");

     
//echo $yearid; exit;
 

$handle = fopen("BookMaster.csv", "r");
while (($data = fgetcsv($handle, 100000, ",")) !== FALSE)
{

  $import = "INSERT INTO book_master (Access_No,Title,Author_Name,Call_No,Location,Sub_Code,Availability,Sup_Code,Pub_Code,Edition,YearPub,NoOfCopy,Descriptor,BType,BPrice,BCost,BCurrency,ISBN,Received_Date,Corp_Author_Name,Series_Author_Name,Series_Title,Volume_No,Part_No,Collation,Binding,Language,Plates,Media,Dept_Code,Invoice_No,Gift_Purchase,Remarks,UG_PG,Accepted_Price,Responsibility,Editors,Meeting,Budget_Code,Add_Field1,Add_Field2,Add_Field3) VALUES ('$data[0]','$data[1]','$data[2]','$data[3]','$data[4]','$data[5]','$data[6]','$data[7]','$data[8]','$data[9]','$data[10]','$data[11]','$data[12]','$data[13]','$data[14]','$data[15]','$data[16]','$data[17]','$data[18]','$data[19]','$data[20]','$data[21]','$data[22]','$data[23]','$data[24]','$data[25]','$data[26]','$data[27]','$data[28]','$data[29]','$data[30]','$data[31]','$data[32]','$data[33]','$data[34]','$data[35]','$data[36]','$data[37]','$data[38]','$data[39]','$data[40]','$data[41]');";
 // $import = "INSERT INTO member_group (id,Group_Name,GEligible,BEligible,BBEligible,BVEligible,NBEligible,JEligible,SEligible,REligible,PEligible,TEligible,GLPeriod,BLPeriod,BBLPeriod,BVLPeriod,NBLPeriod,JLPeriod,SLPeriod,RLPeriod,PLPeriod,TLPeriod,Remarks) VALUES ('$data[0]','$data[1]','$data[2]','$data[3]','$data[4]','$data[5]','$data[6]','$data[7]','$data[8]','$data[9]','$data[10]','$data[11]','$data[12]','$data[13]','$data[14]','$data[15]','$data[16]','$data[17]','$data[18]','$data[19]','$data[20]','$data[21]','$data[22]');";
//mysqli_query($db,$import);

}

echo "Success";
?>