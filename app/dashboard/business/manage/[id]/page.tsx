"use client";
import getCompanyDetailsAction from "@/app/dashboard/business/manage/[id]/getCompanyDetailsAction";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import LicensesInUseCard from "@/components/business/businessDetails/licensesInUseCard";
import CoursesCard from "@/components/business/businessDetails/coursesCard";
import getCompanyEmployeesAction from "@/app/dashboard/business/manage/[id]/getCompanyEmployeesAction";

export default function businessClientDetails({
  params,
}: {
  params: { id: string };
}) {
  // const businessData = getCompanyDetailsAction(params.id);
  const [businessData, setBusinessData] = useState<{
    name: string;
    logo: string;
  } | null>(null);
  const [employees, setEmployees] = useState<
    | {
        id: string;
        status: string;
        firstName: string;
        lastName: string;
        email: string;
        telephone: string;
        password: string;
        roles: string[];
        companyId: string;
        createdAt: Date;
        updatedAt: Date;
        progress: number;
        awards: string;
      }[]
    | null
  >(null);

  useEffect(() => {
    (async () => {
      const data = await getCompanyDetailsAction(params.id);
      const employeesActionResponse = await getCompanyEmployeesAction(
        params.id
      );

      setBusinessData(data);

      // add 2 properties in the employeesActionResponse, progress and awards
      const employeesList = employeesActionResponse.map((employee) => {
        const progress = Math.floor(Math.random() * 100);
        const awards = `${Math.floor(Math.random() * 5)}/${Math.floor(
          Math.random() * 5
        )}`;
        return { ...employee, progress, awards };
      });
      setEmployees(employeesList);
    })();
  }, [params.id]);

  if (!businessData) {
    console.log(`Business with id "${params.id}" not found`);
    return <>Business not found</>;
  }

  const emailsList = [
    { email: "john.doe@vcad.co.uk", progress: 13, awards: "2/5" },
    { email: "jane.smith@vcad.co.uk", progress: 23, awards: "1/5" },
    { email: "robert.jones@vcad.co.uk", progress: 43, awards: "0/5" },
    { email: "emily.taylor@vcad.co.uk", progress: 3, awards: "5/5" },
    { email: "michael.brown@vcad.co.uk", progress: 56, awards: "4/5" },
    { email: "linda.white@vcad.co.uk", progress: 28, awards: "0/5" },
    { email: "william.davis@vcad.co.uk", progress: 78, awards: "3/5" },
    { email: "patricia.martin@vcad.co.uk", progress: 84, awards: "2/5" },
    { email: "david.wilson@vcad.co.uk", progress: 48, awards: "5/5" },
    { email: "susan.moore@vcad.co.uk", progress: 90, awards: "2/5" },
  ];

  const coursesList = [
    {
      course: "The Essentials of Data Protection",
      thumbnail: "/testings/data_protection.png",
    },
    {
      course: "Radicalisation and Extremism (Prevent)",
      thumbnail: "/testings/extremism.png",
    },
    {
      course: "Level 2 Safeguarding Adults",
      thumbnail: "/testings/safeguarding_adults.png",
    },
    {
      course: "Unconscious Bias in the Workplace",
      thumbnail: "/testings/bias.png",
    },
    {
      course: "Bullying and Harassment in the Workplace",
      thumbnail: "/testings/bullying.png",
    },
    {
      course: "Equality, Diversity and Inclusion for Employees",
      thumbnail: "/testings/equality.png",
    },
  ];

  return (
    <>
      <div
        className={"w-full bg-white bg-opacity-30 shadow-xl h-32 px-40 py-10"}
      >
        <div className={"flex justify-between"}>
          <div>
            <div>
              {businessData.logo ? (
                <Image
                  src={businessData.logo}
                  alt="logo"
                  width={100}
                  height={100}
                />
              ) : null}
            </div>
            {businessData.name}
          </div>

          <Button variant="outline" className={"shadow float-right"}>
            {" "}
            Manage admins{" "}
          </Button>
        </div>
      </div>

      <div className={"mx-20 mt-10"}>
        {/* Manage licences  */}
        <LicensesInUseCard employeesList={employees} />
        {/* Manage  courses */}
        <CoursesCard coursesList={coursesList} />
      </div>
    </>
  );
}