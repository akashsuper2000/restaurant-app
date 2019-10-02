create database form;

use form;

drop table details;

create table items (item varchar(50), cost varchar(10));

create table bills (user varchar(50), cost varchar(10));

select * from items;

select * from bills;

delete from items;

delete from bills;
