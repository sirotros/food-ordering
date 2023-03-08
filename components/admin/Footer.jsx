import { useEffect, useState } from "react";
import Input from "@/components/form/Input";
import Title from "@/components/ui/Title";
import { useFormik } from "formik";
import { footerSchema } from "@/schema/footer";
import { toast } from "react-toastify";
import { api } from "@/api";

const Footer = () => {
  const [footerData, setFooterData] = useState([]);

  useEffect(() => {
    const getFooterData = async () => {
      try {
        const res = await api.get(`/footer`);
        setFooterData(res.data[0]);
      } catch (err) {
        toast.error(err.message);
      }
    };
    getFooterData();
  }, []);

  const updateFooterData = async (values, footerData) => {
    try {
      const res = await api.put(`/footer/${footerData._id}`, {
        location: values.location,
        email: values.email,
        phoneNumber: values.phoneNumber,
        desc: values.desc,
        openingHours: {
          day: values.day,
          hour: values.time,
        },
      });
      if (res.status === 200) {
        toast.success("Footer updated successfully");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const createFooterData = async (values) => {
    try {
      const res = await api.post(`/footer`, {
        location: values.location,
        email: values.email,
        phoneNumber: values.phoneNumber,
        desc: values.desc,
        openingHours: {
          day: values.day,
          hour: values.time,
        },
      });
      if (res.status === 200) {
        toast.success("Footer updated successfully");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  const onSubmit = async (values, actions) => {
    if (footerData) {
      await updateFooterData(values, footerData);
    } else {
      createFooterData(values);
    }
  };

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        location: footerData?.location,
        email: footerData?.email,
        phoneNumber: footerData?.phoneNumber,
        desc: footerData?.desc,
        day: footerData?.openingHours?.day,
        time: footerData?.openingHours?.hour,
      },
      onSubmit,
      validationSchema: footerSchema,
    });

  const inputs = [
    {
      id: 1,
      name: "location",
      type: "text",
      placeholder: "Your Location",
      value: values.location,
      errorMessage: errors.location,
      touched: touched.location,
    },
    {
      id: 2,
      name: "email",
      type: "text",
      placeholder: "Your Email",
      value: values.email,
      errorMessage: errors.email,
      touched: touched.email,
    },
    {
      id: 3,
      name: "phoneNumber",
      type: "number",
      placeholder: "Your Phone Number",
      value: values.phoneNumber,
      errorMessage: errors.phoneNumber,
      touched: touched.phoneNumber,
    },
    {
      id: 4,
      name: "desc",
      type: "text",
      placeholder: "Your Description",
      value: values.desc,
      errorMessage: errors.desc,
      touched: touched.desc,
    },
    {
      id: 5,
      name: "day",
      type: "text",
      placeholder: "Update Day",
      value: values.day,
      errorMessage: errors.day,
      touched: touched.day,
    },
    {
      id: 6,
      name: "time",
      type: "text",
      placeholder: "Update Time",
      value: values.time,
      errorMessage: errors.time,
      touched: touched.time,
    },
  ];

  return (
    <form className="lg:p-8 flex-1 lg:mt-0 mt-5" onSubmit={handleSubmit}>
      <Title className="text-[40px]">Footer Settings</Title>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4">
        {inputs.map((input) => (
          <Input
            key={input.id}
            {...input}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        ))}
      </div>
      <button className="btn-primary mt-4" type="submit">
        Update
      </button>
    </form>
  );
};

export default Footer;
