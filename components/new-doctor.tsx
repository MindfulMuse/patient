//E:\Projects\patient monitor\patient monitor\my-app\components\new-doctor.tsx
"use client";

import { useUser } from "@clerk/nextjs";
import { Doctor } from "@/lib/generated/prisma";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Form } from "./ui/form";
import { useForm } from "react-hook-form";
import { CustomInput } from "./custom-input";
import { Button } from "./ui/button";
// import { createNewDoctor, updateDoctor } from "@/app/api/doctor/new-doc/route";
import { createNewDoctor, updateDoctor } from "../lib/actions/doctor"
import { toast } from "sonner";

interface DataProps {
  userId: string;
  data?: Doctor;
  type: "create" | "update";
}

export const NewDoctor = ({ userId, data, type }: DataProps) => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: user?.fullName || "",
      email: user?.emailAddresses[0].emailAddress || "",
      specialization: "",
      license_number: "",
      phone: "",
      address: "",
      department: "",
    },
  });

  const onSubmit = async (values: any) => {
    setLoading(true);
    const res =
      type === "create"
        ? await createNewDoctor(values, userId!)
        : await updateDoctor(values, userId!);

    setLoading(false);

    if (res?.success) {
      toast.success(res.msg);
      form.reset();
      router.push("/doctor");
    } else {
      toast.error(res?.msg ?? "Failed to save doctor");
    }
  };

  useEffect(() => {
    if (type === "update" && data) {
      form.reset({
        name: data.name,
        email: data.email,
        specialization: data.specialization,
        license_number: data.license_number,
        phone: data.phone,
        address: data.address,
        department: data.department ?? "",
      });
    }
  }, [data]);

  return (
    <Card className="max-w-6xl w-full p-4 m-3">
      <CardHeader>
        <CardTitle>Doctor Registration</CardTitle>
        <CardDescription>
          Please provide the doctor’s information.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 mt-5"
          >
            <CustomInput
              type="input"
              control={form.control}
              name="name"
              placeholder="Dr. John Smith"
              label="Name"
            />
            <CustomInput
              type="input"
              control={form.control}
              name="email"
              placeholder="doctor@example.com"
              label="Email"
            />
            <CustomInput
              type="input"
              control={form.control}
              name="specialization"
              placeholder="MBBS"
              label="Specialization"
            />
            <CustomInput
              type="input"
              control={form.control}
              name="license_number"
              placeholder="ABC-1234"
              label="License Number"
            />
            <CustomInput
              type="input"
              control={form.control}
              name="phone"
              placeholder="9876543210"
              label="Phone"
            />
            <CustomInput
              type="input"
              control={form.control}
              name="address"
              placeholder="123 Main St, NY"
              label="Address"
            />
            <CustomInput
              type="input"
              control={form.control}
              name="department"
              placeholder="Surgery"
              label="Department"
            />

            <Button disabled={loading} type="submit">
              {loading ? "Saving..." : type === "create" ? "Register" : "Update"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
