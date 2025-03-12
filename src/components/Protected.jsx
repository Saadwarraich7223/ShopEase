import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const Protected = ({ children, authentication = true }) => {
  const { status } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authentication !== status) {
      navigate(authentication ? "/" : "/");
    }
    setLoading(false);
  }, [status, navigate, authentication]);

  return loading ? <Loader /> : <> {children}</>;
};

export default Protected;
