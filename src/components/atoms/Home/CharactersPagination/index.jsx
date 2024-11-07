import styles from "./style.module.css";
import {useNavigate, useParams} from "react-router-dom";

const CharactersPagination = ({count}) => {
	const navigate = useNavigate();
	const totalPages = Math.ceil(count / 10);
	const {page} = useParams();
	const currentPage = page ? Number(page) : 1;

	const handlePageChange = (number) => {
		if (number > totalPages) {
			navigate(`/${totalPages}`);
		} else if (number < 1) {
			navigate("/1");
		} else {
			navigate(`/${number}`);
		}
		window.scrollTo({top: 0, behavior: "smooth"});
	};

	const renderPageButtons = () => {
		const pageButtons = [];
		const startPage = Math.max(1, currentPage - 2);
		const endPage = Math.min(totalPages, currentPage + 2);

		if (startPage > 1) {
			pageButtons.push(
				<button key="start" onClick={() => handlePageChange(1)}>
					1
				</button>
			);
			pageButtons.push(
				<span key="start-ellipsis" className={styles.ellipsis}>
          ...
        </span>
			);
		}

		for (let i = startPage; i <= endPage; i++) {
			pageButtons.push(
				<button
					key={i}
					onClick={() => handlePageChange(i)}
					className={Number(currentPage) === i ? styles.active_btn : ""}
				>
					{i}
				</button>
			);
		}

		if (endPage < totalPages) {
			pageButtons.push(
				<span key="end-ellipsis" className={styles.ellipsis}>
          ...
        </span>
			);
			pageButtons.push(
				<button key="end" onClick={() => handlePageChange(totalPages)}>
					{totalPages}
				</button>
			);
		}

		return pageButtons;
	};

	return (
		<div className={styles.pagination_container}>
			<button
				onClick={() => handlePageChange(currentPage - 1)}
				disabled={currentPage === 1}
			>
				{"< "}
			</button>
			{renderPageButtons()}
			<button
				onClick={() => handlePageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
			>
				{" >"}
			</button>
		</div>
	);
};

export default CharactersPagination;