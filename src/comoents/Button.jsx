import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const Button = ({ label, orderId, userId }) => {
  const navigate = useNavigate(); // Hook for navigation

  // Function to handle the delete request
  const handleDelete = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_ADMIN_BACKEND_URL}/admin/delete-order`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: orderId }), // Send order number in request body
      });

      if (response.ok) {
        console.log(`Order ${orderId} has been successfully removed.`);
        toast.success(`Order ${orderId} has been successfully removed. Please refresh your page.`);
        navigate(`/dashboard/${userId}`); // Navigate to the dashboard
      } else {
        console.error(`Failed to delete order ${orderId}.`);
        toast.error(`Failed to delete order ${orderId}. Please try again.`);
      }
    } catch (error) {
      console.error('Error deleting the order:', error);
      toast.error('An error occurred while deleting the order.');
    }
  };

  // Function to handle the edit request
  const handleEdit = () => {
    navigate(`/createorder/${orderId}`); // Navigate to the edit order page
  };

  return (
    <StyledWrapper>
      {label === 'Remove' ? (
        <button className="button" onClick={handleDelete}>
          <span>{label}</span>
        </button>
      ) : (
        <button className="button" onClick={handleEdit}>
          <span>{label}</span>
        </button>
      )}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .button {
    position: relative;
    text-decoration: none;
    color: #fff;
    background: linear-gradient(45deg, #0ce39a, #69007f, #fc0987);
    padding: 14px 25px;
    border-radius: 10px;
    font-size: 1.25em;
    cursor: pointer;
  }

  .button span {
    position: relative;
    z-index: 1;
  }

  .button::before {
    content: "";
    position: absolute;
    inset: 1px;
    background: #272727;
    border-radius: 9px;
    transition: 0.5s;
  }

  .button:hover::before {
    opacity: 0.7;
  }

  .button::after {
    content: "";
    position: absolute;
    inset: 0px;
    background: linear-gradient(45deg, #0ce39a, #69007f, #fc0987);
    border-radius: 9px;
    transition: 0.5s;
    opacity: 0;
    filter: blur(20px);
  }

  .button:hover:after {
    opacity: 1;
  }
`;

export default Button;
