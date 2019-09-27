import React from 'react';
import { ButtonGroup,
         Button, 
         Slider, 
         Select,
         ListSubheader,
         MenuItem as SelectItem,
         Typography,
         Switch,
         Grid} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faStop, faRedo } from '@fortawesome/free-solid-svg-icons';

import * as actions from '../store/actions';
import * as selectors from '../store/selectors';
import MenuSection from './MenuSection';
import MenuItem from './MenuItem';



const MenuSolverControls = ({ onStart, onStop }) => {
  const dispatch = useDispatch()
  const algorithm = useSelector(selectors.selectAlgorithm);
  const delay = useSelector(selectors.selectDelay);
  const evaluatingDetailLevel = useSelector(selectors.selectEvaluatingDetailLevel);
  const maxEvaluatingDetailLevel = useSelector(selectors.selectMaxEvaluatingDetailLevel);
  const showBestPath = useSelector(selectors.selectShowBestPath);
  const running = useSelector(selectors.selectRunning);
  const definingPoints = useSelector(selectors.selectDefiningPoints);

  const onAlgorithmChange = event => {
    dispatch(actions.setAlgorithm(event.target.value))
  }

  const onDelayChange = (_, newDelay) => {
    dispatch(actions.setDelay(newDelay))
  }

  const onEvaluatingDetailLevelChange = (onLevel, offLevel) => event => {
    const level = event.target.checked ? onLevel : offLevel;
    dispatch(actions.setEvaluatingDetailLevel(level))
  }

  const onShowBestPathChange = event => {
    dispatch(actions.setShowBestPath(event.target.checked))
  }

  const onReset = () => {
    dispatch(actions.resetSolverState())
  }

  return (
    <MenuSection>
      <MenuItem title="Algorithm">
        <Select value={algorithm}
                onChange={onAlgorithmChange}
                disabled={running || definingPoints}
                variant="outlined"
                fullWidth
                margin="dense"
                >
          <ListSubheader>Exhaustive</ListSubheader>
          <SelectItem value="random">Random</SelectItem>
          <SelectItem value="dfs">Depth First Search</SelectItem>
          <SelectItem value="bandb">Branch and Bound</SelectItem>
          <ListSubheader>Heuristic</ListSubheader>
          <SelectItem value="shortestPath">Shortest Path</SelectItem>
          <SelectItem value="twoOpt">Two Opt Swap</SelectItem>
        </Select>
      </MenuItem>

      <MenuItem title="Controls">
        <ButtonGroup fullWidth variant="outlined" color="secondary" size="large">
          <Button onClick={onStart} disabled={running || definingPoints}>
            <FontAwesomeIcon icon={faPlay} width="0"/>
          </Button>
          <Button onClick={onStop} disabled={!running || definingPoints}>
            <FontAwesomeIcon icon={faStop} width="0" />
          </Button>
          <Button onClick={onReset} disabled={running || definingPoints}>
            <FontAwesomeIcon icon={faRedo} width="0" />
          </Button>
        </ButtonGroup>
      </MenuItem>

      <MenuItem title="Delay">
        <Slider
          value={delay}
          onChange={onDelayChange}
          step={100}
          min={0}
          max={5000}
          valueLabelDisplay="auto"
          color="secondary"
          disabled={definingPoints}
          />
      </MenuItem>

      <MenuItem row>
        <Grid item xs={8}>
          <Typography variant="button" color="textSecondary" component="div">
            Best Path
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Switch
            checked={showBestPath}
            onChange={onShowBestPathChange}
            color="secondary"
            disabled={definingPoints}
            />
        </Grid>

        <Grid item xs={8}>
          <Typography variant="button" color="textSecondary" component="div">
            Intermediate Paths
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Switch
            checked={evaluatingDetailLevel > 0}
            onChange={onEvaluatingDetailLevelChange(1, 0)}
            color="secondary"
            disabled={definingPoints}
            />
        </Grid>

        { maxEvaluatingDetailLevel > 1 &&
          <>
          <Grid item xs={8}>
            <Typography variant="button" color="textSecondary" component="div">
              All Steps
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Switch
              checked={evaluatingDetailLevel > 1}
              onChange={onEvaluatingDetailLevelChange(2, 1)}
              color="secondary"
              disabled={definingPoints}
              />
          </Grid>
          </>
        }
      </MenuItem>

    </MenuSection>
  )
}

export default MenuSolverControls;
