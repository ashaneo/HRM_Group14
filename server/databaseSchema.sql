create table employee (
    ID varchar(20),
    organization_ID varchar(20),
    payroll_ID varchar(20),
    attribute_ID varchar(20),
    detail_ID varchar(20),
    name varchar(20),
    birth_day date,
    matrial_status varchar(20),
    primary key (ID),
    foreign key (organization_ID) references organization(organization_ID),
    foreign key (payroll_ID) references payroll(payroll_ID),
    foreign key (attribute_ID) references attributes(attribute_ID),
    foreign key (detail_ID) references job_detail(detail_ID)
);
    
create table emergency_contact(
    ID varchar(20),
    name varchar(20),
    relationship varchar(20),
    contact_number int,
    primary key (ID),
    foreign key (ID) references employee(ID)
);
     
create table payroll (
    payroll_ID varchar(20),
    amount int,
    paygrade VARCHAR(20),
    primary key (payroll_ID)
);

create table organization(
    organization_ID varchar(20),
    name varchar(20),
    address varchar(20),
    reistration_namber varchar(20),
    primary key (organization_ID)
);
  
create table attributes(
    attribute_ID varchar(20),
    nationality varchar(20),
    religious varchar(20),
    primary key (attribute_ID)
);
  
create table job_detail(
    detail_ID varchar(20),
    job_title varchar(20),
    employment_status varchar(20),
    contract varchar(20),
    paygrade VARCHAR(20),
    job_status varchar(20),
    primary key (detail_ID)
);
     
CREATE TABLE leaves (
    ID VARCHAR(20),
    status VARCHAR(20),
    typeleave_ID VARCHAR(20),
    foreign key (ID) references employee(ID),
    foreign key (typeleave_ID) references typeleave(typeleave_ID)
);

CREATE TABLE typeleave(
    typeleave_ID VARCHAR(20),
    max_dates INT,
    primary key (typeleave_ID)
);

CREATE TABLE annual_leave (
    annual_ID VARCHAR(20),
    ID VARCHAR(20),
    num_dates INT,
    start_date date,
    end_date date,
    primary key (annual_ID),
    foreign key (ID) references leaves(ID)
);

CREATE TABLE casual_leave (
    casual_ID VARCHAR(20),
    ID VARCHAR(20),
    num_dates INT,
    start_date date,
    end_date date,
    primary key (casual_ID),
    foreign key (ID) references leaves(ID)
);

CREATE TABLE nopay_leave (
    nopay_ID VARCHAR(20),
    ID VARCHAR(20),
    num_dates INT,
    start_date date,
    end_date date,
    primary key (nopay_ID),
    foreign key (ID) references leaves(ID)
);

CREATE TABLE maternity_leave (
    maternity_ID VARCHAR(20),
    ID VARCHAR(20),
    num_dates INT,
    start_date date,
    end_date date,
    primary key (maternity_ID),
    foreign key (ID) references leaves(ID)
);